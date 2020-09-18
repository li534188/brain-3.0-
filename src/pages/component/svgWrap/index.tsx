import React, { PureComponent } from 'react'
import Taro  from  '@tarojs/taro'
import { View, Text, Image, } from '@tarojs/components'

interface OuterData{
    cost:number;
    [propName: string]: any;
}

interface DrawPie{
    element:HTMLElement|null;
    R?:number;
    data:OuterData[];
    [propName: string]: any;
}

/**
 * 写一个公共svg环形图
 */
export default function SvgWrap(props){

    let minPadding = 40; //设置数据项两点最小间距
    let w ;
    let h ;
    /**
     * 将创建环图的所有操作写在drawPie函数内，配置一些默认参数
     * @param  {Element} element [插入SVG的元素，缺省直接插入到body]
     * @param  {Number}  R       [外弧起终点计算半径]
     * @param  {Number}  r       [内弧起终点计算半径]
     * @param  {Number}  width   [画布宽度]
     * @param  {Number}  height  [画布高度]
     * @param  {Array}   data    [图表数据]
     */
    const drawPie = ({element, R = 140, r = 100,width = 450,height = 400,data = []}:DrawPie) => {
            w = width;
            h = height; //将width、height赋值给w、h
            let origin = [w / 2, h / 2]; //原点坐标
            let drawData:OuterData[] = [];//保存遍历后可直接绘制的数据
            let sAngel = 0;//保存每项数据的起始点角度
            let eAngel = sAngel;//保存每项数据的结束角点度
            let cAngel ;//保存每项数据的中点角度
            let leftPoints:OuterData[] = []; //保存在左边的点
            let rightPoints:OuterData[]= []; //保存在右边的点,分出左右是为了计算两点垂直间距是否靠太近
            let tAngel = Math.PI * 2; // 为了简化代码 弧度 = 百分比 * 360 * Math.PI /180
            
            //total保存总花费,用于计算数据项占比
            let total = data.reduce(function(v, item:OuterData) {
                return v + item.cost;
            }, 0)

            //创建svg标签，设置画布
            let svg =  createSvgTag('svg', {
                'width': w + 'px',
                'height': h + 'px',
                'viewBox': `0 0 ${w} ${h}`,     
            });

            //遍历计算每项数据，生成绘制数据
            for(let v of (data as OuterData[])) {
                let itemData = Object.assign({}, v);//copy一遍，不直接修改原数据
                let isLeft = false; 
                eAngel = sAngel + v.cost / total * tAngel;//计算结束弧度
                itemData.arclineStarts = [
                    evaluateXY(r, sAngel, origin), //计算P0坐标
                    evaluateXY(R, sAngel, origin), //计算P1坐标 
                    evaluateXY(R, eAngel, origin), //计算P2坐标 
                    evaluateXY(r, eAngel, origin)  //计算P3坐标
                    ];
                //大于Math.PI需要画大弧，否则画小弧
                itemData.LargeArcFlag = (eAngel - sAngel) > Math.PI ? '1' : '0'; 
                //计算线条起始点公位置
                itemData.lineStart = evaluateXY(R, sAngel + (eAngel - sAngel)/2, origin);
                //线条起点x值小于原点x值，在左侧，否则在右侧
                itemData.isLeft = isLeft = itemData.lineStart[0]  < origin[0];
                //根据线条起点左右，设置结束点
                itemData.lineEnd = [(isLeft ? 0 : w), itemData.lineStart[1]];
                //线条起点y值小于原点y值，在上部，否则在下部，用于确实过挤往上/下移动
                itemData.top = itemData.lineStart[1] < origin[1];
                //根据线条起点左右，添加到leftPoints/rightPoints,用于处理过挤
                isLeft? leftPoints.push(itemData) : rightPoints.push(itemData); 
                drawData.push(itemData)//保存到drawData数据中，绘制时遍历
                sAngel = eAngel;//将下一项数据的起始弧度设置为当前项的结束弧度
            }

            makeUseable(rightPoints, false); //处理右边挤在一起的情况
            makeUseable(leftPoints.reverse(), true); //处理左边挤在一起的情况，为什么要翻转一下，看makeUseable函数

            //遍历drawData开始绘制
            for(let v of drawData) {
                let P = v.arclineStarts;//将path路四个点变量，赋值给变量p

                //创建path标签(份额)
                let path = createSvgTag('path', {
                    'fill': v.color, //设置填充色
                    'stroke': 'black',
                    'stroke-width': '0', //画笔大小为零
                    /**
                     * d属性设置路径字符串
                     * M ${P[0][0]} ${P[0][1]} 移动画笔到P0点
                     * L ${P[1][0]} ${P[1][1]} 绘制一条直线到P1
                     * A ${R} ${R} 0 ${v.LargeArcFlag} 1 ${P[2][0]} ${P[2][1]} 绘制外环弧到P2,R为外半径，v.LargeArcFlag画大弧还是小弧
                     * L ${P[3][0]} ${P[3][1]} 绘制一条直线到P3
                     * A ${r} ${r}  0 ${v.LargeArcFlag} 0 ${P[0][0]} ${P[0][1]} 绘制内环弧到P0点
                     * z 关闭路径
                     */
                    'd': `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${v.LargeArcFlag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${v.LargeArcFlag} 0 ${P[0][0]} ${P[0][1]} z`
                })
                //设置线条点
                let linePoints = v.lineStart[0] + ' ' + v.lineStart[1]; //设置起点
                //如果有折点，添加折点
                v.turingPoints && (linePoints += ',' + v.turingPoints[0] + ' ' + v.turingPoints[1]);
                //设置结束点
                linePoints += ',' + v.lineEnd[0] + ' ' + v.lineEnd[1];
                //创建polyline标签(线条)
                let polyline = createSvgTag('polyline', {
                    points: linePoints,
                    style: `fill:none;stroke:${v.color};stroke-width:.5`
                })
                //创建text标签，显示花费
                let cost = createSvgTag("text", {
                    'x':  v.lineEnd[0],
                    'y':  v.lineEnd[1],
                    'dy': -2,
                    style: `fill:${v.color};font-size:12px;text-anchor: ${v.isLeft? 'start':'end'};`
                })
                cost.innerHTML = v.cost;
                //创建text标签，显示花费分类
                let category = createSvgTag("text", {
                    'x':  v.lineEnd[0],
                    'y':  v.lineEnd[1],
                    'dy': 14,
                    style: `fill:${v.color};font-size:12px;text-anchor: ${v.isLeft? 'start':'end'};`
                })
                category.innerHTML = v.category;

                svg.appendChild(path);  //path(份额)添加到画布中            
                svg.appendChild(polyline);//polyline(线条)添加到画布中  
                svg.appendChild(cost);//text(花费)添加到画布中  
                svg.appendChild(category);//text(花费分类)添加到画布中  
            } 

            

            (element && element.appendChild) ? element.appendChild(svg) : document.body.appendChild(svg); //插入到DOM
            
            return svg;
    }

     /**
     * 将创建SVG标签写成一个函数
     * @param  {tring} tagName    [标签名]
     * @param  {Object} attributes [标签属性]
     * @return {Element} svg标签
     */
    const createSvgTag = (tagName, attributes) => {
        let tag = document.createElementNS('http://www.w3.org/2000/svg', tagName)
        for (let attr in attributes) {
            tag.setAttribute(attr, attributes[attr])
        }
        return tag;
    }

    /***
     * 计算坐标
     */
    const evaluateXY = (r, angel, origin) => {
        return [origin[0] + Math.sin(angel) * r, origin[0] - Math.cos(angel) * r]                                                                                  
    }

    function isUseable(arr) { // 判断是否会有数据挤在一起(两点最小间距是否都大于等于minPadding)
        if (arr.length <= 1)
            return true;
        
        return arr.every(function(p, index, arr) {
            if (index === arr.length-1) {
                //因为是当前项和下一项比较，所以index === arr.length-1直接返回true
                return true;
            } else {
                /**
                 * 判断当前数据项结束点：p.lineEnd[1]
                 * 和下一数据项结束点垂直间距是否大于等于最小间距：minPadding
                 * 只有数据线条结束点垂直间距大于等于最小间距，才会返回true
                 */
                return arr[index + 1].lineEnd[1]  - p.lineEnd[1] >= minPadding;
            }
        })
    }

    /**
     * 特殊情况
     */
    function makeUseable(arr, left) {// 处理挤在一起的情况 
        let diff, turingAngel, x, maths = Math.sin,diffH, l;

        /**
         * 这里的思路是
         * 如果数据是非可用的(会挤在一起，isUseable判断)
         * 就一直循环移动数据，直至可用
         * 可能会有更好的算法，我这鱼木脑袋只想到这种的
         * 欢迎大家提供更好的思路或算法
         */
        while (!isUseable(arr)) { //每次循环处理一次，直至数据不会挤在一起

            for (let i = 0, len = arr.length - 1; i < len; i++) { //遍历数组

                diff = arr[i + 1].lineEnd[1] - arr[i].lineEnd[1]; //计算两点垂直间距

                if (diff < minPadding) { //小于最小间距，表示会挤到一起

                    if (arr[i].top && arr[i + 1].top) { //是在上部的点，向上移动

                        /**
                         * 判断当前的点是否还可以向上移动
                         * 上方第一个点最往上只可以移动到y值为0
                         * 之后依次最往上只能移动动y值为：i * minPadding 
                         * 所以下面判断应该是：arr[i].lineEnd[1] - (minPadding - diff) > i * minPadding
                         */
                        /**
                         * 上面左边leftPoints的点需要翻转一下的原因是
                         * 左边leftPoints的点最上面的点是排在最后的
                         */
                        if (arr[i].lineEnd[1] - (minPadding - diff) > 0 && arr[i].lineEnd[1] > i * minPadding) {
                            //当前点还能向上移动
                            //向上移动到不挤(满足最小间距)
                            arr[i].lineEnd[1] = arr[i].lineEnd[1] - (minPadding - diff);
                        } else {
                            //当前点不向上移动到满足最小间距的位置
                            //先把当前点移动到能够移动的最上位置
                            arr[i].lineEnd[1] = i * minPadding;
                            //再把下个点移动，使满足最小间距
                            arr[i + 1].lineEnd[1] = arr[i + 1].lineEnd[1] + (minPadding - diff);
                        }

                    } else {
                        //是在下部的点，向下移动
                        /**
                         * 判断当前点的下个点是否还可以向下移动
                         * 下方最后一个点最往下只可以移动到y值为h,即图表高度
                         * 之前的点依次最往下只能移动动y值为：h - (len - i - 1) * minPadding
                         * 所以下面判断应该是：arr[i + 1].lineEnd[1] + (minPadding - diff) < h - (len - i - 1) * minPadding
                         */
                        if (arr[i + 1].lineEnd[1] + (minPadding - diff) < h && arr[i + 1].lineEnd[1] < h - (len - i - 1) * minPadding) {
                             //当前点的下个点还能向下移动
                            //当前点的下个点向下移动到不挤(满足最小间距)
                            arr[i + 1].lineEnd[1] = arr[i + 1].lineEnd[1] + (minPadding - diff)
                        } else {
                            //当前点的下个点不能向下移动
                            //先把当前点的下个点向下移动能够移动的最下位置
                            arr[i + 1].lineEnd[1] = h - (len - i - 1) * minPadding;
                            //再把当前点移动，使满足最小间距
                            arr[i].lineEnd[1] = arr[i].lineEnd[1] - (minPadding - diff);
                        }
                    }

                    break; //每次移动完成直接退出循环，判断一次是否已经不挤
                }
            }
        }

    }
    /**
     * 将创建SVG标签写成一个函数
     * @param  {tring} tagName    [标签名]
     * @param  {Object} attributes [标签属性]
     * @return {Element} svg标签
     */
    let obj = drawPie({
        element: document.getElementById('svgWrap'),
        data: [{
            cost: 4.94,
            category: '通讯',
            color: "#e95e45",
        }, {
            cost: 4.78,
            category: '服装美容',
            color: "#20b6ab",
        }, {
            cost: 4.00,
            category: '交通出行',
            color: "#ef7340",
        }, {
            cost: 3.00,
            category: '饮食',
            color: "#eeb328",
        }, {
            cost: 49.40,
            category: '其他',
            color: "#f79954",
        }, {
            cost: 28.77,
            category: '生活日用',
            color: "#00a294",
        }]
    })
    return(
        <View>
            <Image src={obj}></Image>
        </View>
    )
        
}
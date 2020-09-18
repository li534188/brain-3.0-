import React, { PureComponent } from 'react'
import Taro,{getCurrentInstance}  from  '@tarojs/taro'
import { View, Image, Text, Canvas } from '@tarojs/components'

export default class CanvasCircle extends PureComponent{
    private ctx;

    constructor(props){
        super(props)
        this.state={
            show:false
        }
    }

    componentWillMount () {
      }
    
      componentDidMount () {
        this.ctx = Taro.createCanvasContext("image-cropper");
        
        addPie({r:50, width:200, height:200,
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
            }],ctx:this.ctx})
        this.ctx.draw(false, () => {
          console.log("call back");
        });
      }
    
    
      componentWillUnmount () { }
    
      componentDidShow () {
        
      }


    
      componentDidHide () { }

      init = (res) =>{
        // console.log('8989898989898998989')
        //   console.log(res)
            const width = res[0].width
            const height = res[0].height
        
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
        
            const dpr = Taro.getSystemInfoSync().pixelRatio
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.scale(dpr, dpr)

            ctx.arc(10, 10, 10, 0, Math.PI * 2)
            ctx.fillStyle = '#1aad19'
            ctx.strokeStyle = 'rgba(1,1,1,0)'
            ctx.fill()
            ctx.stroke()
            ctx.fillRect(0, 0, 100, 100)
      }
      
      render(){
          return(
            <Canvas  type='' style='width: 300px; height: 200px;' id='image-cropper' canvasId='image-cropper' />
          );
      }
}

interface OuterData{
    [propName: string]: any;
}



interface DrawPie{
    R?:number;
    data:OuterData[];
    [propName: string]: any;
}

/**
 * 绘制饼图函数
 * 使用到的ES6语法有函数默认参数、解构、字符模板
 * 如果不熟悉，可以看看阮老师的《ECMAScript 6 入门》 
 * 网址 http://es6.ruanyifeng.com/
 * 函数的默认参数
 * r 圆环的圆半径  data 数据项
 * width 图表宽度 height 图表高度
 */
function addPie({r = 100,width = 450,height = 400,data = [], ctx}:DrawPie) {
    let w = width; 
    let h = height; //将width、height赋值给w、h
    let originX = w / 2; //原点x值
    let originY = h / 2; //原点y值
    let points:any[] = []; //用于保存数据项线条起点坐标
    let leftPoints:any[] = []; //保存在左边的点
    let rightPoints:any[] = []; //保存在右边的点,分出左右是为了计算两点垂直间距是否靠太近
    let fontSize = 12; //设置字体大小，像素
    
    //total保存总花费,用于计算数据项占比
    let total = data.reduce(function(v, item) {
        return v + item.cost;
    }, 0)
     /**
      * sAngel 起始角弧度
      * arc方法绘制弧线/圆时，弧的圆形的三点钟位置是 0 度
      * 也就是0弧度对应笛卡坐标的90度位置
      * 为了让饼图从笛卡坐标的0度开始
      * 起始角弧度需要设置为-.5 * Math.PI
      */
    let sAngel = -.5 * Math.PI; 
    let eAngel = -.5 * Math.PI; //结束角弧度，初始值等于sAngel
    let aAngel = Math.PI * 2; //整圆弧度，用于计算数据项弧度
    let pointR = r + 10; //计算线条起始点的半径
    let minPadding = 30; //设置数据项两点最小间距
    //设置canvas和画布大小
    let cAngel; //数据项中间位置的弧度值，用于计算线条起始点
    for (let i = 0, len = data.length; i < len; i++) { /* 绘制不同消费的份额 */
        /**
         * 计算结束角弧度
         * 等于上一项数据起始弧度值(sAngel)
         * 加数据占比(data[i].cost/total)乘以整圆弧度(aAngel)
         */
        eAngel = sAngel + data[i].cost/total * aAngel ; 
        //画弧
        _drawArc(ctx, {
            origin: [originX, originY],
            color: data[i].color,
            r,
            sAngel,
            eAngel
        })
        /**
         * 计算cAngel值
         * cAngel是用于计算线条起始点
         * 等于当前数据项的起始弧度:sAngel
         * 加上当前数据项所占弧度的一半:(eAngel - sAngel) / 2
         * 因为arc方法0弧度对应笛卡坐标的90度位置，我们让sAngel从 -0.5 * Math.PI开始的
         * 所以cAngel还要加 0.5 * Math.PI
         */
        cAngel = 0.5 * Math.PI + sAngel + (eAngel - sAngel) / 2;
        /**
         * 保存每个数据项线条的起始点
         * 根据三角函数
         * 已知半径/斜边长:pointR, 通过正弦函数可以计算出对边长度
         * 原点x坐标加对边长度，就是线条起始点x坐标
         * 通过余弦函数可以计算出邻边长度
         * 原点y坐标减邻边长度，就是线条起始点y坐标
         */
        points.push([originX + Math.sin(cAngel) * pointR, originY - Math.cos(cAngel) * pointR])
        sAngel = eAngel; //设置下一数据项的起始角度为当前数据项的结束角度
    }
    for (let i = 0, len = points.length; i < len; i++) { /* 绘制起始点的小圆点，并分出左右 */
        // 绘制起始点的小圆点
        _drawArc(ctx, {
            origin: points[i],
            color: data[i].color,
            r: 2
        })
        if (points[i][0] < originX) { /* x坐标小于原点x坐标，在左边 */
            leftPoints.push({
                point: points[i],
                /**
                 * top标记坐标是否在y轴正方向(是不是在上方)
                 * 用于判断当两点挤在一起时，是优先向下还是向上移动线条线束点坐标
                 */
                top: points[i][1] < originY, //y坐标小于原点y坐标。表示在上方
                /**
                 * endPoint保存线条结束点坐标
                 * y值不变，在左边时结束点x为零
                 */
                endPoint: [0, points[i][1]] 
            });
        } else { /* 否则在右边*/
            rightPoints.push({
                point: points[i],
                top: points[i][1] < originY, //y坐标小于原点y坐标。表示在上方
                endPoint: [w, points[i][1]] //y值不变，在右边时结束点x为图表宽度w
            });
        }
    }
    
    _makeUseable(rightPoints, false); //处理右边挤在一起的情况
    _makeUseable(leftPoints.reverse(), true); //处理左边挤在一起的情况
    leftPoints.reverse(); //为什么要翻转一下，看_makeUseable函数
    
    let i = 0;
    for (let j = 0, len = rightPoints.length; j < len; j++) { // 绘制右侧线条、文本
        _drawLine(ctx, {data:data[i], point:rightPoints[j], w, direct: 'right'});
        i++;
    }
    for (let j = 0, len = leftPoints.length; j < len; j++) { // 绘制左侧线条、文本
        _drawLine(ctx, {data:data[i], point:leftPoints[j], w});
        i++;
    }
    /* 再绘制一个圆盖住饼图，实现圆环效果 */
    // _drawArc(ctx, {
    //     origin: [originX, originY],
    //     r: r / 5 * 3
    // })
    /* 画弧函数 */
    function _drawArc(ctx, {color = '#fff',origin = [0, 0],r = 100,sAngel = 0, eAngel = 2 * Math.PI}) {
        ctx.beginPath(); //开始
        ctx.strokeStyle = color; //设置线条颜色
        ctx.fillStyle = color; //设置填充色
        ctx.moveTo(...origin); //移动原点
        ctx.arc(origin[0], origin[1], r, sAngel, eAngel); //画弧
        ctx.fill(); //填充
        ctx.stroke();//绘制已定义的路径，可省略
    }
    /* 画线和文本 函数 */
    function _drawLine (ctx, {direct='left',data,point,w = 200}) {
        ctx.beginPath(); //开始
        ctx.moveTo(...point.point); //移动画笔到线条起点
        ctx.strokeStyle = data.color; //设置线条颜色
        if (point.turingPoint) //存在折点 
            ctx.lineTo(...point.turingPoint); //画一条到折点的线
        ctx.lineTo(...point.endPoint);//画一条到结束点的线
        ctx.stroke();//绘制已定义的路径
        ctx.font = `${fontSize}px 微软雅黑`; //设置字体相关
        ctx.fillStyle = '#000'; //设置字体颜色
        ctx.textAlign = direct;//设置文字对齐方式
        //绘制数据项花费文字，垂直上移两个像素
        ctx.fillText(data.cost,direct === 'left'?0:w, point.endPoint[1] - 2);
        //绘制数据项名称，垂直下移fontSize个像素
        ctx.fillText(data.category, direct === 'left'?0:w, point.endPoint[1] + fontSize);
    }
    function _isUseable(arr) { // 判断是否会有数据挤在一起(两点最小间距是否都大于等于minPadding)
        if (arr.length <= 1)
            return true;
        
        return arr.every(function(p, index, arr) {
            if (index === arr.length-1) {
                //因为是当前项和下一项比较，所以index === arr.length-1直接返回true
                return true;
            } else {
                /**
                 * 判断当前数据项结束点：p.endPoint[1]
                 * 和下一数据项结束点垂直间距是否大于等于最小间距：minPadding
                 * 只有数据线条结束点垂直间距大于等于最小间距，才会返回true
                 */
                return arr[index + 1].endPoint[1]  - p.endPoint[1] >= minPadding;
            }
        })
    }
    function _makeUseable(arr, left) {// 处理挤在一起的情况 
        let diff, turingAngel, x, maths = Math.sin,diffH, l;
        /**
         * 这里的思路是
         * 如果数据是非可用的(会挤在一起，_isUseable判断)
         * 就一直循环移动数据，直至可用
         * 数据项过多时会出现死循环
         * 因为需求上说数据项不会过多，并且还要让大家帮我看看能不能获得面试机会
         * 所以这里不做修改
         * 可能会有更好的算法，我这鱼木脑袋只想到这种的
         * 欢迎大家提供更好的思路或算法
         */
        while (!_isUseable(arr)) { //每次循环处理一次，直至数据不会挤在一起
            for (let i = 0, len = arr.length - 1; i < len; i++) { //遍历数组
                diff = arr[i + 1].endPoint[1] - arr[i].endPoint[1]; //计算两点垂直间距
                if (diff < minPadding) { //小于最小间距，表示会挤到一起
                    if (arr[i].top && arr[i + 1].top) { //是在上部的点，向上移动
                        /**
                         * 判断当前的点是否还可以向上移动
                         * 上方第一个点最往上只可以移动到y值为0
                         * 之后依次最往上只能移动动y值为：i * minPadding 
                         * 所以下面判断应该是：arr[i].endPoint[1] - (minPadding - diff) > i * minPadding
                         */
                        /**
                         * 上面左边leftPoints的点需要翻转一下的原因是
                         * 左边leftPoints的点最上面的点是排在最后的
                         */
                        if (arr[i].endPoint[1] - (minPadding - diff) > 0 && arr[i].endPoint[1] > i * minPadding) {
                            //当前点还能向上移动
                            //向上移动到不挤(满足最小间距)
                            arr[i].endPoint[1] = arr[i].endPoint[1] - (minPadding - diff);
                        } else {
                            //当前点不向上移动到满足最小间距的位置
                            //先把当前点移动到能够移动的最上位置
                            arr[i].endPoint[1] = i * minPadding;
                            //再把下个点移动，使满足最小间距
                            arr[i + 1].endPoint[1] = arr[i + 1].endPoint[1] + (minPadding - diff);
                        }
                    } else {
                        //是在下部的点，向下移动
                        /**
                         * 判断当前点的下个点是否还可以向下移动
                         * 下方最后一个点最往下只可以移动到y值为h,即图表高度
                         * 之前的点依次最往下只能移动动y值为：h - (len - i - 1) * minPadding
                         * 所以下面判断应该是：arr[i + 1].endPoint[1] + (minPadding - diff) < h - (len - i - 1) * minPadding
                         */
                        if (arr[i + 1].endPoint[1] + (minPadding - diff) < h && arr[i + 1].endPoint[1] < h - (len - i - 1) * minPadding) {
                             //当前点的下个点还能向下移动
                            //当前点的下个点向下移动到不挤(满足最小间距)
                            arr[i + 1].endPoint[1] = arr[i + 1].endPoint[1] + (minPadding - diff)
                        } else {
                            //当前点的下个点不能向下移动
                            //先把当前点的下个点向下移动能够移动的最下位置
                            arr[i + 1].endPoint[1] = h - (len - i - 1) * minPadding;
                            //再把当前点移动，使满足最小间距
                            arr[i].endPoint[1] = arr[i].endPoint[1] - (minPadding - diff);
                        }
                    }
                    break; //每次移动完成直接退出循环，判断一次是否已经不挤
                }
            }
        }
        /**
         * 遍历已经可用的数据 
         * 起点和结束点不在同一水平线上
         * 需要设置折点
         * 这里通过设置折线角度，计算出折点位置
         * 回头一想，其实可以用更简单的方法，想复杂了
         */
        for (let i = 0, len = arr.length; i < len; i++) { 
            //起点和结束点y值不等，则不在同一水平线，需要设置折点
            if (arr[i].point[1] !== arr[i].endPoint[1]) { 
                turingAngel = 1 / 3 * Math.PI; //默认折线角度设置60度
                //计算出起点和结束点高度差
                diffH = arr[i].endPoint[1] - arr[i].point[1]; 
                //计算出起点和结束点水平距离l
                l = Math.abs(arr[i].endPoint[0] - arr[i].point[0]); 
                /**
                 * x 这里的本意是
                 * 想计算出折点和起始点的水平距离x
                 * 因为起始点到折点的水平距离
                 * 不能大于起始点到结束的水平距离-40(留40放文字)
                 * 通过x可以确定折点的x坐标值
                 * 所以已知对边和角度，应该使用正切函数求邻边边长
                 * 这里却使用了正弦求了斜边
                 */
                x = Math.abs(maths(turingAngel) * diffH);
                /**
                 * 如果始点到折点的水平距离
                 * 大于起始点到结束的水平距离-40(留40放文字)
                 * 减小角度，计算新折点
                 */
                while (x > (l - 40)) { 
                    turingAngel /= 2;
                    x = maths(turingAngel) * (arr[i].endPoint[1] - arr[i].point[1]);
                }
                //通过x可以确定折点的x坐标值,y坐标就是结束点的y坐标
                arr[i].turingPoint = [arr[i].point[0] + (left ? -x : x), arr[i].endPoint[1]]
            }
        }
    }
}
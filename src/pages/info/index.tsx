import React, { Component } from 'react'
import Taro,{getCurrentInstance}  from  '@tarojs/taro'
import { View, Image, Text, Icon } from '@tarojs/components'
import { AtCurtain,AtIcon  } from 'taro-ui'
// import { Canvas } from 'taro-ui'
// import './index.scss'
import visionSelectSvg from '../../asset/vision_select.svg'
import motionSelectSvg from '../../asset/motion_select.svg'
import hearingSelectSvg from '../../asset/hearing_select.svg'
import lobeSelectSvg from '../../asset/lobe_select.svg'
import cerebellumSelectSvg from '../../asset/cerebellum_select.svg'
import sixSelectSvg from '../../asset/six_select.svg'
import './index.scss'


export interface Mystate{
    isOpened:boolean,
    name:string
}

export interface Myprop{
  data:{
    selectModel:string
    closeModel():void;
  }
}
let dataInfo = {
    vision:{title:'精神思维区', img:visionSelectSvg, info:'视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域', url:''},
    motion:{title:'运动联络区', img:motionSelectSvg, info:'视觉联络区主要包含了。。。区域', url:''},
    hearing:{title:'听觉联络区', img:hearingSelectSvg, info:'视觉联络区主要包含了。。。区域', url:''},
    lobe:{title:'视觉联络区', img:lobeSelectSvg, info:'视觉联络区主要包含了。。。区域', url:''},
    cerebellum:{title:'小脑', img:cerebellumSelectSvg, info:'视觉联络区主要包含了。。。区域', url:''},
    part_six:{title:'脑干', img:sixSelectSvg, info:'视觉联络区主要包含了。。。区域', url:''},
}
export default class Info extends Component<Myprop,Mystate> {
  constructor(props:Myprop){
      super(props)
      this.state={
        isOpened: false,
        name:"",
      }
  }

  componentWillMount () {
    let target = getCurrentInstance().router;
    if(target){
      console.log("9999999999999")
      console.log(target.params)
      this.setState({
        name:'vision'
      })
    }
  }

  componentDidMount () {
  }


  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange () {
    this.setState({
      isOpened: true
    })
  }

  onClose () {
    this.setState({
      isOpened: false
    })
  }

  render () {
    const {name} = this.state;
    const {data:{selectModel, closeModel}} = this.props
    console.log(999999);
    console.log(selectModel)
    return (
    dataInfo[selectModel]?
      <View className='wrapper'>
        <View className='level clear'>
          <AtIcon value='chevron-down' size='30' color='#ffffff' onClick={()=>{closeModel()}}></AtIcon>
        </View>
        <View className='level card'>
          <View className='title'>
            <View className='title_header'>
              <Text>{dataInfo[selectModel].title}</Text>
            </View>
            <View className='title_detail'>
              <Text>上皮层</Text>
            </View>
            <View className='title_detail'>
              <Text>下皮层</Text>
            </View>
          </View>
          <View className='img_wrapper'>
            <Image className='img_target' src={dataInfo[selectModel].img}></Image>
          </View>
          <View className='detail'>
            <View className='doc'>
              {dataInfo[selectModel].info}
            </View>
          </View>
          <View hover-class='#113809' className='link' onClick={()=>{console.log('我已被点击')}}>
            查看训练方法
          </View>
        </View>

      </View>
    :<View />
    )
  }
}

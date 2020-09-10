import React, { Component } from 'react'
import Taro,{getCurrentInstance}  from  '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { AtCurtain,AtButton } from 'taro-ui'
// import { Canvas } from 'taro-ui'
// import './index.scss'
import BrainMain from '../../asset/brain-main3.png'
import './index.scss'


export interface Mystate{
    isOpened:boolean,
    name:string
}
let data = {
    vision:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域', url:''},
    motion:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域', url:''},
    hearing:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域', url:''},
    lobe:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域', url:''},
    cerebellum:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域', url:''},
}
export default class Info extends Component<any,Mystate> {
  constructor(props){
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
        name:target.params.name
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
    return (
        <View>
        <AtCurtain
          isOpened={this.state.isOpened}
          onClose={this.onClose.bind(this)}
        >
            <View className='title'>
                {data[name].title}
            </View>
            <Image
              style='width:100%;height:250px'
              src={data[name].img}
            />
            <ScrollView className='detail'>
              <Text className='detail_info' >{data[name].info}</Text >
            </ScrollView>
            <View hover-class='#113809' className='link' onClick={()=>{console.log('我已被点击')}}>
              查看训练方法
            </View>
      </AtCurtain>
      <AtButton
        onClick={this.handleChange.bind(this)}
      >
        右上关闭幕帘
      </AtButton>
      </View>
    )
  }
}

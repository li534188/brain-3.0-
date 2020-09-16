import React, { Component } from 'react'
import Taro,{getCurrentInstance}  from  '@tarojs/taro'
import { View, Image, Text, Icon } from '@tarojs/components'
import { AtCurtain,AtIcon  } from 'taro-ui'
// import { Canvas } from 'taro-ui'
// import './index.scss'
import BrainMain from '../../asset/brain-main3.png'
import './index.scss'


export interface Mystate{
    isOpened:boolean,
    name:string
}

export interface Myprop{
  data:{
    selectModel:string
  }
}
let data = {
    vision:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域视觉联络区主要包含了。。。区域', url:''},
    motion:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域', url:''},
    hearing:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域', url:''},
    lobe:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域', url:''},
    cerebellum:{title:'视觉联络区', img:BrainMain, info:'视觉联络区主要包含了。。。区域', url:''},
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
    const {data:{selectModel}} = this.props
    return (
        <View className='wrapper'>
        {/* <AtCurtain
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
      </AtButton> */}
        <View className='level clear'>
          <AtIcon value='chevron-down' size='30' color='#ffffff'></AtIcon>
        </View>
        <View className='level card'>
          <View className='title'>
            <View className='title_header'>
              <Text>主要视觉区</Text>
            </View>
            <View className='title_detail'>
              <Text>上皮层</Text>
            </View>
            <View className='title_detail'>
              <Text>下皮层</Text>
            </View>
          </View>
          <View className='img_wrapper'>
            <Image className='img_target' src={data[name].img}></Image>
          </View>
          <View className='detail'>
            <View className='doc'>
              描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言描述语言
            </View>
          </View>
          <View hover-class='#113809' className='link' onClick={()=>{console.log('我已被点击')}}>
            查看训练方法
          </View>
        </View>

      </View>
    )
  }
}

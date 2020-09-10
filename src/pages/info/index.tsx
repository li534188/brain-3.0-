import React, { Component } from 'react'
import Taro  from  '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtCurtain,AtButton } from 'taro-ui'
// import { Canvas } from 'taro-ui'
// import './index.scss'
import BrainMain from '../../asset/brain-main.png'


export interface Mystate{
    isOpened:boolean
}
export default class Info extends Component<any,Mystate> {
  constructor(props){
      super(props)
      this.state={
        isOpened: false
      }
  }

  componentWillMount () { 

  }

  componentDidMount () { 
      // 操作画布
      const ctx  = Taro.createCanvasContext('poster')
    //   const ctx = canvas.getContext("2d");
    ctx.drawImage(BrainMain, 0, 0, 200, 200)
    ctx.draw()
    //   canvas.drawImage(BrainMain, 0, 0, 200, 200)
    // const query = Taro.createSelectorQuery().in(this.$scope);
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
    return (
        <View>
        <AtCurtain
            isOpened={this.state.isOpened}
            onClose={this.onClose.bind(this)}
        >
            <View>
                标题
            </View>
            <Image
                style='width:100%;height:250px'
                src={BrainMain}
            />
      </AtCurtain>
      <AtButton
        onClick={this.handleChange.bind(this)}>
        右上关闭幕帘
      </AtButton>
      </View>
    )
  }
}

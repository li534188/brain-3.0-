import React, { Component } from 'react'
import Taro  from  '@tarojs/taro'
import { View, Text,  Canvas, Image, WebView } from '@tarojs/components'
// import { Canvas } from 'taro-ui'
// import './index.scss'
import BrainMain from '../../asset/brain-main.png'
import planets from  '../../asset/planets.gif'

export default class Brain extends Component {
  myRef: React.RefObject<any>
  constructor(props){
      super(props)
      this.myRef = React.createRef();
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

  render () {
    return (
      <View className='index'>
        <WebView src='http://127.0.0.1:3000' > </WebView>
      </View>
    )
  }
}

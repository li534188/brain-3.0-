import React, { Component } from 'react'
import { View, Text, Image, Map, CoverView  } from '@tarojs/components'
import { AtButton } from 'taro-ui'
// import './index.scss'
import planets from  '../../asset/planets.gif'

export default class Hello extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>跳转页面</Text>
        <AtButton >测试bootstrap</AtButton>
        <Image src={planets} style={{width:"145px", height:"126px"}}  />
        <Map longitude={0} latitude={0}>
          <CoverView >
            <CoverView marker-id='1'></CoverView>
            <CoverView marker-id='2'></CoverView>
          </CoverView>
      </Map>
      </View>
    )
  }
}

import React, { PureComponent } from 'react'
import Taro  from  '@tarojs/taro'
import { View, Text,  Canvas, Image, WebView, Swiper , SwiperItem  } from '@tarojs/components'
// import { Canvas } from 'taro-ui'
// import './index.scss'
import Info from '../info/index'
import visionSvg from '../../asset/vision.svg'
import motionSvg from '../../asset/motion.svg'
import hearingSvg from '../../asset/hearing.svg'
import lobeSvg from '../../asset/lobe.svg'
import cerebellumSvg from '../../asset/cerebellum.svg'
import sixSvg from '../../asset/six.svg'
import visionSelectSvg from '../../asset/vision_select.svg'
import motionSelectSvg from '../../asset/motion_select.svg'
import hearingSelectSvg from '../../asset/hearing_select.svg'
import lobeSelectSvg from '../../asset/lobe_select.svg'
import cerebellumSelectSvg from '../../asset/cerebellum_select.svg'
import sixSelectSvg from '../../asset/six_select.svg'
import './index.scss'
import CanvasCircle from '../component/canvasCircle'

let partData = ['vision','motion','hearing','lobe','cerebellum','part_six',]
interface Mystate{
  selectModel:string
}
export default class Brain extends PureComponent<any, Mystate> {
  constructor(props){
      super(props)
      this.state = {
        selectModel:''
      }
  }

  componentWillMount () {
  }

  componentDidMount () {

  }


  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  clickEvent = (e,item) =>{
    e.stopPropagation();
    this.setState({
      selectModel:item,
    })
  }

  closeModel = ()=>{
    this.setState({
      selectModel:'',
    })
  }

  render () {
    const {selectModel} = this.state;
    return (
      <View className='index' onClick={this.closeModel}>
          <View className='tdc-main-right-demo'>
              <View className='tdc-main-right-demo-brain'>
                  <View className={`tdc-brain-part tdc-frontal-lobe ${selectModel===partData[0]?'active':''}`}>
                    <Image className='svg' src={selectModel===partData[0]?visionSelectSvg:visionSvg} />
                  </View>
                  <View className={`tdc-brain-part tdc-parietal-lobe ${selectModel===partData[1]?'active':''}`} >
                    <Image className='svg' src={selectModel===partData[1]?motionSelectSvg:motionSvg} />
                  </View>
                  <View className={`tdc-brain-part tdc-temporal-lobe ${selectModel===partData[2]?'active':''}`} >
                    <Image className='svg' src={selectModel===partData[2]?hearingSelectSvg:hearingSvg} />
                  </View>
                  <View className={`tdc-brain-part tdc-occipital-lobe ${selectModel===partData[3]?'active':''}`}>
                    <Image  className='svg' src={selectModel===partData[3]?lobeSelectSvg:lobeSvg} />
                  </View>
                  <View className={`tdc-brain-part tdc-cerebellum ${selectModel===partData[4]?'active':''}`} >
                    <Image className='svg' src={selectModel===partData[4]?cerebellumSelectSvg:cerebellumSvg} />
                  </View>
                  <View className={`tdc-brain-part tdc-brain-stem ${selectModel===partData[5]?'active':''}`} >
                    <Image className='svg' src={selectModel===partData[5]?sixSelectSvg:sixSvg} />
                  </View>
                  {partData.map(item=>(
                    <View className={item} onClick={(e)=>{this.clickEvent(e,item)}}>
                    </View>
                  ))}
              </View>
              <View  onClick={(e)=>{e.stopPropagation()}} className={`modal ${selectModel?'active':''}`}>
                <Info data={{selectModel:selectModel, closeModel:this.closeModel}} />
              </View>
              <View className='swiper_view'>
                <Swiper
                  className='test-h'
                  indicatorColor='#999'
                  indicatorActiveColor='#333'
                  indicatorDots
                  circular
                  autoplay
                >
                  <SwiperItem>
                    <View className='demo-text-1'>
                      <CanvasCircle />
                    </View>
                  </SwiperItem>
                  <SwiperItem>
                    <View className='demo-text-2'>2</View>
                  </SwiperItem>
                  <SwiperItem>
                    <View className='demo-text-3'>3</View>
                  </SwiperItem>
                </Swiper>
              </View>

          </View>
          {/* <View className='arrow'>
            <View className='part_wisdom left_part'>
            </View>
            <View className='part_one font'>
              智
            </View>
            <View className='part_action right_part'>
            </View>
            <View className='part_two font'>
              行
            </View>
            <View className='part_balance left_part'>
            </View>
            <View className='part_three font'>
              衡
            </View>
            <View className='part_vision right_part'>
            </View>
            <View className='part_four font'>
              视
            </View>
          </View> */}

      </View>
    )
  }
}

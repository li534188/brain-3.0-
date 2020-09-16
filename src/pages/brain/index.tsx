import React, { PureComponent } from 'react'
import Taro  from  '@tarojs/taro'
import { View, Text,  Canvas, Image, WebView } from '@tarojs/components'
// import { Canvas } from 'taro-ui'
// import './index.scss'
import Info from '../info/index'
import BrainMain from '../../asset/brain-main.png'
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

let partData = ['part_one','part_two','part_three','part_four','part_five','part_six',]
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

  clickEvent = (e,item) =>{
    e.stopPropagation();
    this.setState({
      selectModel:item,
    })
  }

  test = ()=>{
    this.setState({
      selectModel:'',
    })
  }

  render () {
    const {selectModel} = this.state;
    console.log(selectModel)
    return (
      <View className='index' onClick={this.test}>
          <View className="tdc-main-right-demo">
                    <View className="tdc-main-right-demo-brain">
                        <View className={`tdc-brain-part tdc-frontal-lobe ${selectModel===partData[0]?'active':''}`}>
                          <Image className='svg' src={selectModel===partData[0]?visionSelectSvg:visionSvg} />
                        </View>
                        <View className={`tdc-brain-part tdc-cerebellum ${selectModel===partData[4]?'active':''}`} >
                          <Image className='svg' src={selectModel===partData[4]?motionSelectSvg:motionSvg} />
                        </View>
                        <View className={`tdc-brain-part tdc-occipital-lobe ${selectModel===partData[3]?'active':''}`}>
                          <Image  className='svg' src={selectModel===partData[3]?hearingSelectSvg:hearingSvg} />
                        </View>
                        <View className={`tdc-brain-part tdc-parietal-lobe ${selectModel===partData[1]?'active':''}`} >
                          <Image className='svg' src={selectModel===partData[1]?lobeSelectSvg:lobeSvg} />
                        </View>
                        <View className={`tdc-brain-part tdc-temporal-lobe ${selectModel===partData[2]?'active':''}`} >
                          <Image className='svg' src={selectModel===partData[2]?sixSelectSvg:sixSvg} />
                        </View>
                        <View className={`tdc-brain-part tdc-brain-stem ${selectModel===partData[5]?'active':''}`} >
                          <Image className='svg' src={selectModel===partData[5]?cerebellumSelectSvg:cerebellumSvg} />
                        </View>
                        {partData.map(item=>(
                          <View className={item} onClick={(e)=>{this.clickEvent(e,item)}}>
                          </View>
                        ))}
                    </View>
                </View>
                <View  onClick={(e)=>{e.stopPropagation()}} className={`modal ${selectModel?'active':''}`}>
                  <Info data={{selectModel:selectModel}} />
                </View>
      </View>
    )
  }
}

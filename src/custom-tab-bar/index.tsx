import React, { Component, useState  } from 'react'
import ReactDOM from 'react-dom'
import Taro from '@tarojs/taro'
import { bindActionCreators } from 'redux';
import {connect, useSelector, useDispatch} from 'react-redux'
import { View, Text, Navigator, Button,CoverView, CoverImage } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import * as  actions from '../actions/global'
import  './index.scss'
import minePng from '../asset/mine.png'
import exercisePng from '../asset/exercise.png'
import communityPng from '../asset/community.png'
import meditationPng from '../asset/meditation.png'
import brainPng from '../asset/brain.png'


export interface MyProps {
  pageIndex : number,
  setIndex(index:number):{}
}


export interface MyState{
    data:{
        [propName: string]: any;
    }
}
let initData = {
  selected: 0,
  color: "#7A7E83",
  selectedColor: "#3cc51f",
  list: [{
    pagePath: "/pages/meditation/index",
    iconPath: meditationPng,
    selectedIconPath: "/image/icon_component_HL.png",
    text: "冥想"
  }, {
    pagePath: "/pages/exercise/index",
    iconPath: exercisePng,
    selectedIconPath: "/image/icon_API_HL.png",
    text: "锻炼"
  }, {
    pagePath: "/pages/brain/index",
    iconPath: brainPng,
    selectedIconPath: "/image/icon_API_HL.png",
    text: "大脑"
  }, {
    pagePath: "/pages/community/index",
    iconPath: communityPng,
    selectedIconPath: "/image/icon_API_HL.png",
    text: "社区"
  }, {
    pagePath: "/pages/mine/index",
    iconPath: minePng,
    selectedIconPath: '../asset/mine.png',
    text: "我的"
  }]
}

export default function Indexs(){
  const [data, setData] = useState(initData);

  const {list, selectedColor, color} = data;

  const dispatch = useDispatch()
  // const {pageIndex} = this.props
  const pageIndex = useSelector(state=> state.global.global.pageIndex);
  console.log('+++++++++++')
  console.log(pageIndex)

  const switchTab = (e) => {
    console.log(123)
    const info = e.currentTarget.dataset
    const url = info.path
    console.log(info)
    Taro.switchTab({url})
    dispatch(actions.setIndex(info.index))

    setData({
      ...data,selected:info.index
    })

    
  }
  return (
    <CoverView className="tab-bar">
    <CoverView className="tab-bar-border"></CoverView>

    {list.map((item,index)=>(
        <CoverView key={item.pagePath} className="tab-bar-item" data-path={item.pagePath} data-index={index} onClick={switchTab}>
            <CoverImage  className={pageIndex === index ? 'text-select' : ''}  src={item.iconPath}></CoverImage>
            <CoverView style={{color:(pageIndex === index ? selectedColor : color)}}>{item.text}</CoverView>
        </CoverView>
    ))}
</CoverView>
  );
}

// class Index extends Component<MyProps, MyState> {
  
  
//   constructor(props:MyProps){
//     super(props)
//     this.state={
//       data: {
//           selected: 0,
//           color: "#7A7E83",
//           selectedColor: "#3cc51f",
//           list: [{
//             pagePath: "/pages/meditation/index",
//             iconPath: meditationPng,
//             selectedIconPath: "/image/icon_component_HL.png",
//             text: "冥想"
//           }, {
//             pagePath: "/pages/exercise/index",
//             iconPath: exercisePng,
//             selectedIconPath: "/image/icon_API_HL.png",
//             text: "锻炼"
//           }, {
//             pagePath: "/pages/brain/index",
//             iconPath: brainPng,
//             selectedIconPath: "/image/icon_API_HL.png",
//             text: "大脑"
//           }, {
//             pagePath: "/pages/community/index",
//             iconPath: communityPng,
//             selectedIconPath: "/image/icon_API_HL.png",
//             text: "社区"
//           }, {
//             pagePath: "/pages/mine/index",
//             iconPath: minePng,
//             selectedIconPath: '../asset/mine.png',
//             text: "我的"
//           }]
//         },
//     }
// }

//   componentWillMount () { }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }




//   render () {
//     const {data:{list, selectedColor, color}} = this.state;
//     const {pageIndex} = this.props
//     console.log('+++++++++++')
//     console.log(pageIndex)
//   return (
//       <CoverView className="tab-bar">
//           <CoverView className="tab-bar-border"></CoverView>
  
//           {list.map((item,index)=>(
//               <CoverView key={item.pagePath} className="tab-bar-item" data-path={item.pagePath} data-index={index} onClick={this.switchTab}>
//                   <CoverImage  className={pageIndex === index ? 'text-select' : ''}  src={item.iconPath}></CoverImage>
//                   <CoverView style={{color:(pageIndex === index ? selectedColor : color)}}>{item.text}</CoverView>
//               </CoverView>
//           ))}
//       </CoverView>
//     )
// }


// }

// const mapStateToProps = (state) => {
//   return {
//     pageIndex: state.global.global.pageIndex,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//       {
//           ...actions
//       },
//       dispatch
//   );
// };

//  connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Indexs);









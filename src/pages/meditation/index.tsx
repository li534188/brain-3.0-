import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Taro from '@tarojs/taro'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import { View, Text, Navigator, Button, Canvas} from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import * as  actions from '../../actions/counter'
import  './index.scss'
import CanvasCircle from '../component/canvasCircle'

export interface Iprops {
  num: number,
  add:  {(): number},
  show: boolean,
  parentShow: {():void}
}

export interface Mstate{
  current: number
}
class Index extends Component<Iprops, Mstate> {

  textInput: any;
  private ctx;

  constructor(props){
    super(props)
    this.state = {
      current: 0
    }
    this.textInput = React.createRef();
  }

  componentWillMount () { }

  componentDidMount () { 
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  clickAdd = () =>{
    const {add, parentShow} = this.props;
    add();
    parentShow();
    Taro.navigateTo({
      url: "/pages/info/index?name=vision"
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
    Taro.navigateTo({
      url: '/pages/hello/index'
    })
  }

  changeClassName = ()=>{
    console.log(this.textInput.current)
    // document.getElementById(this.state.pre).setAttribute("class", "item")
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this.textInput.current)
    // this.textInput.current.class = 'navigator-toch'
  }

  render () {
    const {num,show} = this.props;
    console.log(show);
    return (
      <View>
        <View className='indexClass'>
          <Text>首页</Text>
          <Text>{num||1}</Text>
          <Button onClick={this.clickAdd}>点击</Button>
        </View>
        <View className='nav-menu'>
        {/* url='/pages/index/index' openType='redirect'
        url='/pages/hello/index' openType='redirect' */}
          <View onTouchStart={this.changeClassName} ref={this.textInput} className='navigator'  >回到首页</View>
          <View onTouchStart={this.changeClassName} className='navigator'  >跳转页面</View>
        </View>
        <AtTabBar
          tabList={[
          { title: '待办事项', text: 8 },
          { title: '拍照' },
          { title: '通讯录', dot: true }
        ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
        <CanvasCircle />
      </View>
    )
  }


}

const mapStateToProps = (state) => {
  return {
      num: state.parents.counter.num,
      show: state.parents.tree.show
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
      {
          ...actions
      },
      dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

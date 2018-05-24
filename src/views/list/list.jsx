import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { List as AntList, Checkbox } from 'antd-mobile'
import s from './list.scss'
import { SWITCH_TODO } from '../../redux/constants/ActionTypes'

const { Item } = AntList
const { CheckboxItem } = Checkbox

/**
 * 通过mapStateToProps方法将store中的字段映射到组件的props中
 * @param state 完整的store树
 * @returns {{list: *}} 注入组件中的props参数
 */
const mapStateToProps = state => ({
  list: state.list,
})

/**
 * 通过mapDispatchToProps方法将actions注入到组件的props中
 * @param dispatch
 * @param ownProps
 * @returns {{switchTodo: (function(*, *): *)}}
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  switchTodo: (status, id) => dispatch({ type: SWITCH_TODO, status, id }),
})

/**
 * 以下为第二种组件构造形式
 * 本质上是一个从Component或PureComponent继承出来的类
 * 关于pureComponent: https://www.zcfy.cc/article/why-and-how-to-use-purecomponent-in-react-js-60devs
 * 关键的方法为render方法 该方法会将JSX模板渲染成真实的DOM节点
 * props属性用于接收从父组件传递来的数据(vue中也有)
 * state属性用于保存组件内部的数据
 * state类似于vue中的data属性 区别在于react中的数据是单向流动的
 * 也就是说你不能直接this.state.xxx = xxx这样操作state，而是通过调用this.setState()方法对数据进行更新
 * 📌关于react中数据的不变性 强烈建议观看此视频 https://www.youtube.com/watch?v=Wo0qiGPSV-s
 */

/**
 * connect方法是react-redux库的核心方法
 * connect方法接受mapStateToProps和mapDispatchToProps两个方法作为参数
 * 前者是将state注入组件 后者是将action注入组件
 * 返回值是一个高阶组件 也就是一个接受组件并返回组件的函数
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class List extends PureComponent {
  componentDidMount() {
    console.log(this.props.list)
  }

  /**
   * 🔆这里是react中最重要的一个方法 用于输出组件模板
   */
  render() {
    return (
      <AntList className={s.list}>
        { this.renderTodoList() }
        { this.renderDoneList() }
      </AntList>
    )
  }

  /**
   * 渲染组件列表的方法
   * 为了代码的清晰度 建议把每一小块的渲染单独抽离出来作为方法调用
   * 另外 个人习惯于以render方法为界
   * 把这些抽离出来的处理渲染的方法放在render方法的下方
   * 把事件句柄等处理逻辑的方法放在render方法的上方
   * @returns {React[]}
   */
  renderTodoList = () => {
    const { list: { todoList } } = this.props
    return todoList.map(i => (
      <Item
        key={i.id}
        thumb={this.renderThumb('todo', i.id)}
      >{i.title}</Item>
    ))
  }

  /**
   * 渲染已完成项目的列表
   * @returns {React[]}
   */
  renderDoneList = () => {
    const { doneList } = this.props.list
    return doneList.map(i => (
      <Item
        key={i.id}
        thumb={this.renderThumb('done', i.id)}
      ><s>{i.title}</s></Item>
    ))
  }

  /**
   * 渲染列表每一项前面的checkbox
   * @param type string[t\odo | done] 该项目的状态 当状态为done时添加删除线
   * @param id number 当前项目的id
   * @returns {React[]}
   */
  renderThumb = (type, id) => <CheckboxItem className={s.checkbox} onChange={() => this.props.switchTodo(type, id)} defaultChecked={type === 'done'} />
}

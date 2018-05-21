import React, { PureComponent } from 'react'
import { List as AntList, Checkbox } from 'antd-mobile'
import s from './list.scss'

const { Item } = AntList
const { CheckboxItem } = Checkbox

const data = [{
  title: '我今天要吃饭',
  id: 1,
}, {
  title: '我今天要睡觉',
  id: 2,
}, {
  title: '我今天要打游戏',
  id: 3,
}, {
  title: '我今天要打豆豆',
  id: 4,
}]

export default class List extends PureComponent {
  /**
   * 组件内部数据 类似于vue中的this.data
   * @type {{todoList: [], doneList: []}}
   */
  state = {
    todoList: data,
    doneList: [],
  }

  /**
   * 切换项目状态
   * @param type ['t\odo'|'done'] 根据当前项目状态来确定操作类别
   * @param id number 当前项目id
   */
  switchTodo = (type, id) => {
    const { todoList, doneList } = this.state
    /**
     * 特别注意此处⬇️ 和vue不一样的地方
     * vue的数据是双向绑定的  直接在this.xxx变量上改动即可
     * react的数据单向绑定  需要先声明一个新变量 然后用setState方法重新放入数据流中
     */
    let newTodo = []
    let newDone = []
    /**
     * 处理数据并生成新的数据
     */
    if (type === 'todo') {
      newTodo = todoList.filter(i => {
        if (i.id !== id) return true
        newDone = [i, ...doneList].sort((a, b) => a.id - b.id > 0)
        return false
      })
    }
    if (type === 'done') {
      newDone = doneList.filter(i => {
        if (i.id !== id) return true
        newTodo = [i, ...todoList].sort((a, b) => a.id - b.id > 0)
        return false
      })
    }
    // 将新的数据放回数据流
    // 当数据更新时 会重新出发render方法
    // 如果直接在todoList, doneList上改动
    // 会因为数据地址未改变 导致react认为数据未更新 不会重新渲染
    this.setState({ todoList: newTodo, doneList: newDone })
  }

  /**
   * ⚠️这里是react中最重要的一个方法 用于输出组件模板
   */
  render() {
    return (
      <AntList className={s.list}>
        { this.renderTodoList() }
        { this.state.doneList.map(i => (
          <Item key={i.id} arrow="horizontal" thumb={this.renderThumb('done', i.id)}><s>{i.title}</s></Item>
        )) }
      </AntList>
    )
  }

  /**
   * 渲染组件列表的方法
   * 也可以不写函数，而是像doneList那样直接写在render方法中
   * 但是为了代码的清晰度 建议把每一小块的渲染单独抽离出来作为方法调用
   * 另外 个人习惯于以render方法为界
   * 把这些抽离出来的处理渲染的方法放在render方法的下方
   * 把事件句柄等处理逻辑的方法放在render方法的上方
   * @returns {React[]}
   */
  renderTodoList = () => {
    const { todoList } = this.state
    return todoList.map(i => (
      <Item key={i.id} arrow="horizontal" thumb={this.renderThumb('todo', i.id)}>{i.title}</Item>
    ))
  }

  /**
   * 渲染列表每一项前面的checkbox
   * @param type string[t\odo | done] 该项目的状态 当状态为done时添加删除线
   * @param id number 当前项目的id
   * @returns {React[]}
   */
  renderThumb = (type, id) => <CheckboxItem onChange={() => this.switchTodo(type, id)} defaultChecked={type === 'done'} />
}

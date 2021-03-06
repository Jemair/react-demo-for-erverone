import { Toast } from 'antd-mobile'
import { SWITCH_TODO, ADD_TODO, INPUT_TODO } from '../constants/ActionTypes'

const initialState = {
  todoList: [{
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
  }],
  doneList: [],
  input: '',
}

/**
 * 3. 在reducer中添加对该action的响应处理
 * @param state 上一个渲染周期中报错的state
 * @param action {{type: string, [string]: any }} 当前执行的action操作 type字段必传 和actions/index.js中对应
 * @returns {{todoList: *[], doneList: Array}}
 */
export default function list(state = initialState, action) {
  switch (action.type) {
    case SWITCH_TODO:
      return switchTodo(state, action.status, action.id)
    case INPUT_TODO:
      return { ...state, input: action.input }
    case ADD_TODO:
      return addTodo(state, action.title)
    default:
      return state
  }
}

function addTodo(state) {
  const { todoList } = state
  if (!state.input) {
    Toast.fail('输入内容不能为空')
    return state
  }
  return { ...state, todoList: [{ title: state.input, id: todoList.length + 1 }, ...todoList] }
}

/**
 * 处理传入的action 相当于把之前在组件中写的switchTodo方法挪到了这里
 * @param state
 * @param type
 * @param id
 * @returns {{todoList: Array, doneList: Array}}
 */
function switchTodo(state, type, id) {
  const { todoList, doneList } = state
  let newTodo = []
  let newDone = []
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
  return { todoList: newTodo, doneList: newDone }
}

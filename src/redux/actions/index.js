import * as types from '../constants/ActionTypes'

export const increment = () => ({ type: types.INCREMENT })

/**
 * 2. 添加一个action
 * @param status 当前item的状态
 * @param id 当前item的id
 * @returns {{type: string, status: *, id: *}} 返回值会传递给reducers type字段必传 该字段表明了当前action执行了哪一种操作
 */
export const switchTodo = (status, id) => ({ type: types.SWITCH_TODO, status, id })

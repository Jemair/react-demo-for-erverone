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
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

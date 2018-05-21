import React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'utils/LoadableComponent'
import Header from 'components/header/header'
import List from 'views/list/list'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { InputItem } from 'antd-mobile'
import './App.scss'

import { Provider } from 'react-redux'
import store from '$redux/store'

/**
 * react中输出组件有两种形式
 * 以下为第一种
 * 当组件内部没有状态变化 故名无状态组件
 * 只负责展示UI时可以使用这种组件
 * 特点是轻量化、性能略高一点
 * @returns {*}
 * @constructor
 */
const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/:id" component={Loadable({ loader: () => import('views/add/add') })} />
      <Route path="/" component={List} />
    </Switch>
  </div>
)

const reduxApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

export default hot(module)(reduxApp)

import React from 'react'
import { hot } from 'react-hot-loader'
import Header from 'components/header/header'
import List from 'views/list/list'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.scss'

import { Provider } from 'react-redux'
import store from '$redux/store'

const App = () => (
  <div className="App">
    <Header />
    <Route path="/" component={List} />
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

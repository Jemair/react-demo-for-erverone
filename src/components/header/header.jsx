import React, { PureComponent } from 'react'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar, Menu, Icon, Toast } from 'antd-mobile'
import s from './header.scss'
import { ADD_TODO } from '../../redux/constants/ActionTypes'

const initData = [{
  label: '菜单1号',
  value: 1,
}, {
  label: '菜单2号',
  value: 2,
}, {
  label: '菜单3号',
  value: 3,
}]

const mapStateToProps = state => ({
  input: state.list.input,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: () => {
    dispatch({ type: ADD_TODO })
    ownProps.history.replace('/')
  },
})

/**
 * 没有被<Route>包裹的组件默认不会带有router相关的props
 * 这时可以用withRouter方法封装一层 这样就可以在后退按钮中调用goBack方法了
 * 修饰器的用法是一个es6的语法糖 之后会在redux中大量用到
 * 此处可以等价于
 * export default withRouter(Header)
 */
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends PureComponent {
  state = {
    showMenu: false,
    chosenValue: [1],
  }

  componentDidMount() {
    console.log(this.props)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideMenu)
  }

  hideMenu = () => {
    this.setState({ showMenu: false })
  }

  handleMenuClick = e => {
    this.setState({ showMenu: true })
    e.nativeEvent.stopImmediatePropagation()
    document.addEventListener('click', this.hideMenu)
  }

  handleMenuChange = value => {
    this.setState({ chosenValue: value })
  }

  render() {
    const { showMenu, chosenValue } = this.state

    return (
      <div className={s.header}>
        <NavBar
          leftContent={this.renderLeft()}
          rightContent={this.renderRight()}
        >
          一看就会的React demo
        </NavBar>
        { showMenu &&
          <Menu
            className={s.menu}
            onChange={this.handleMenuChange}
            data={initData}
            value={chosenValue}
            level={1}
            height="auto"
          />
        }
      </div>
    )
  }

  renderLeft = () => (
    <Switch>
      <Route exact path="/" render={() => <div onClick={this.handleMenuClick}>menu</div>} />
      <Route render={() => <Icon onClick={() => { this.props.history.goBack() }} type="left" />} />
    </Switch>
  )

  renderRight = () => (
    <Switch>
      <Route exact path="/:id" render={() => <span onClick={this.props.handleSubmit}>提交</span>} />
      <Route render={() => <Link to="/add"><Icon type="plus" /></Link>} />
    </Switch>
  )
}

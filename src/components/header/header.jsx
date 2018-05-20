import React, { PureComponent } from 'react'
import { NavBar, Menu } from 'antd-mobile'
import s from './header.scss'

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

export default class Header extends PureComponent {
  state = {
    showMenu: false,
    chosenValue: [1],
  }

  handleLeftClick = e => {
    this.setState({ showMenu: true })
    e.nativeEvent.stopImmediatePropagation()
    document.addEventListener('click', () => {
      this.setState({ showMenu: false })
    })
  }

  handleMenuChange = value => {
    this.setState({ chosenValue: value })
  }

  render() {
    const { showMenu, chosenValue } = this.state

    return (
      <div className={s.header}>
        <NavBar
          leftContent={'Menu'}
          onLeftClick={this.handleLeftClick}
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
}

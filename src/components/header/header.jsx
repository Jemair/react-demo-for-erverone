import React, { PureComponent } from 'react'
import { NavBar } from 'antd-mobile'
import s from './header.scss'

export default class Header extends PureComponent {
  render() {
    return (
      <div className={s.div}>
        <NavBar />
      </div>
    )
  }
}

import React, { PureComponent } from 'react'
import { List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import { INPUT_TODO } from '../../redux/constants/ActionTypes'

const mapStateToProps = state => ({
  input: state.list.input,
})

const mapDispatchToProps = dispatch => ({
  handleInput: input => {
    if (!input) { return }
    dispatch({ type: INPUT_TODO, input })
  },
})

/**
 * rc-form这个库用于在表单中管理输入框 如输入框校验等 此处不展开
 * 详细文档见https://github.com/react-component/form
 */
@connect(mapStateToProps, mapDispatchToProps)
@createForm()
export default class Add extends PureComponent {
  render() {
    return (
      <List>
        <InputItem
          onBlur={this.props.handleInput}
        >
          待办标题
        </InputItem>
      </List>
    )
  }
}

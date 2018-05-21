import React, { PureComponent } from 'react'
import { List, InputItem, TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'

/**
 * rc-form这个库用于在表单中管理输入框 如输入框校验等 此处不展开
 * 详细文档见https://github.com/react-component/form
 */
@createForm()
export default class Add extends PureComponent {
  render() {
    const { getFieldProps } = this.props.form
    return (
      <List>
        <InputItem
          // 用展开操作符将一个Object下的所有属性展开
          // 常用的一个操作是 <Component {...this.props} />将所有props作为属性传递给子组件
          {...getFieldProps('title', {
            rules: { required: true },
          })}
        >
          待办标题
        </InputItem>
        <TextareaItem rows={3} editable={false} value="此处仅做页面跳转、UI控制 无法提交 关于数据流动部分在redux部分详细说明" />
      </List>
    )
  }
}

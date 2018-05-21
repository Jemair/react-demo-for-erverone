import React from 'react'
import ReactLoadable from 'react-loadable'

/**
 * 在加载异步代码时loading显示的组件
 * @param props
 * @returns {*}
 * @constructor
 */
function LoadingComponent(props) {
  if (props.error) {
    // When the loader has errored
    return <div>Error! <button onClick={props.retry}>Retry</button></div>
  } else if (props.timedOut) {
    // When the loader has taken longer than the timeout
    return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>
  } else if (props.pastDelay) {
    // When the loader has taken longer than the delay
    return <div>Loading...</div>
  } else {
    // When the loader has just started
    return null
  }
}

/**
 * 异步加载的实现比较多
 * 这里采用react-router-v4推荐的一种
 * 具体文档见https://github.com/jamiebuilds/react-loadable#loadingcomponent
 * 在实际操作时对原本的Loadable封装了一层 这样可以达到复用的效果
 * @param opts
 * @returns {*}
 * @constructor
 */
export default function Loadable(opts) {
  return ReactLoadable(Object.assign({
    loading: () => <LoadingComponent />,
    delay: 200,
    timeout: 10,
  }, opts))
}

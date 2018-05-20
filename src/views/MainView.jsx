import React from 'react'
import PropTypes from 'prop-types'
import Imported from 'react-imported-component'
import { NavLink as Link, Route } from 'react-router-dom'
import './MainView.scss'
import SyncView from './SyncView'

const MainView = ({ route }) => (
  <div className="main-view">
    <div className="btn-group">
      <Link to="/sync" className="btn" activeClassName="active">To Sync</Link>
      <Link to="/async" className="btn" activeClassName="active">To Async</Link>
    </div>
    <div className="view">
      <Route path={'/async'} component={Imported(() => import('./AsyncView'))} />
      <Route path={'/sync'} component={SyncView} />
    </div>
  </div>
)

MainView.prototype.propTypes = {
  route: PropTypes.object,
}

export default MainView

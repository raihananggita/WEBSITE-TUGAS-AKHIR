/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: //product/paper-dashboard-react
* Copyright 2022 Creative Tim (/)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from 'reactstrap'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'

import logo from '../../assets/img/telkom.png'

var ps

function Sidebar(props) {
  const sidebar = React.useRef()
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
    }
  })
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a href="/" className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a href="/" className="simple-text logo-normal">
          WEBSITE PREDIKSI
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? ' active-pro' : '')
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link text-semibold"
                  style={{ fontWeight: 600 }}
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            )
          })}
        </Nav>
      </div>
    </div>
  )
}

export default Sidebar

import React from 'react'
import { Link } from 'react-router-dom'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap'
// import Headroom from 'react-headroom'
import SearchForm from './SearchForm'
import User from './UserContainer'
import { IconLink } from '../icons'

export default class Example extends React.Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <Navbar
        fixed="top"
        color="faded"
        light
        expand="sm"
        className="navbar-dark bg-dark"
      >
        <NavbarBrand tag={Link} to="/">
          {this.props.brand}
          <IconLink />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mx-auto" navbar>
            <NavbarBrand tag={Link} to={'/links'}>
              Links
            </NavbarBrand>
            <NavbarBrand tag={Link} to={'/tags'}>
              Tags
            </NavbarBrand>
            <NavbarBrand tag={Link} to={'/users'}>
              Users
            </NavbarBrand>
            <NavItem>
              <SearchForm />
            </NavItem>
          </Nav>
          <User />
        </Collapse>
      </Navbar>
    )
  }
}

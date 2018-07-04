import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, Box, Flex, Fixed, Container, Hide, Button } from 'ui'

import User from './User'

const Links = ({ isOpen, onClick }) => (
  <Hide
    is="form"
    onClick={onClick}
    hidden={!isOpen && [true, false]}
    flexDirection={['column', 'row']}
    w={1}
    alignItems={['flex-start', 'center']}
  >
    {/* <Button is={Link} mx={[0, 2]} to={'/links'}>
      Links
    </Button>
    <Button is={Link} mx={[0, 2]} to={'/tags'}>
      Tags
    </Button> */}
    <Box mx="auto" />
    <User />
  </Hide>
)
export class Navbar extends PureComponent {
  state = { isOpen: false }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleOnClick = event => {
    event.preventDefault()
    if (this.state.isOpen) {
      this.toggle()
    }
  }
  render() {
    const { brand } = this.props
    const { isOpen } = this.state
    return (
      <Fixed top={0} left={0} right={0}>
        <Toolbar>
          <Container
            is={Flex}
            w={1}
            flexDirection={['column', 'row']}
            alignItems={['stretch', 'center']}
            my={2}
            px={0}
          >
            <Flex>
              <Button is={Link} mx={0} to={'/'}>
                {brand}
              </Button>
              <Box mx="auto" />
              <Hide hidden={[false, true]} alignItems="center">
                <Button onClick={this.toggle}>MENU</Button>
              </Hide>
            </Flex>
            <Box mx="auto" />
            <Links isOpen={isOpen} onClick={this.handleOnClick} />
          </Container>
        </Toolbar>
      </Fixed>
    )
  }
}

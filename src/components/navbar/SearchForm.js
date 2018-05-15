import React from 'react'
import { Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import ModalMessage from '../common/ModalMessage'
import { IconSearch } from '../icons'

export default class SearchForm extends React.Component {
  state = {
    value: ''
  }
  handleChange = event => {
    this.setState({
      value: event.target.value,
      modal: false
    })
  }
  handleSubmit = event => {
    this.setState({ modal: true })
    event.preventDefault()
  }
  handleCloseModal = () => {
    this.setState({ modal: false })
  }
  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <InputGroup>
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              value={this.state.value}
              onChange={this.handleChange}
            />
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <ModalMessage
          isOpen={this.state.modal && this.state.value.trim() !== ''}
          toggle={this.handleCloseModal}
          header={this.state.value}
        />
      </Form>
    )
  }
}

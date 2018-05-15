import React from 'react'
import User from './User'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signoutSuccess } from '../../redux/modules/auth'

class UserContainer extends React.PureComponent {
  render = () => <User {...this.props} />
}

const mapStateToProps = (state, ownProps = {}) => ({
  authenticated: state.auth.authenticated,
  userName: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  signout: bindActionCreators(signoutSuccess, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)

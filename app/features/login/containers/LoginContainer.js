import React from 'react';
import { connect } from 'react-redux';
import LoginView from './LoginView';
import { login } from '../actions';

const LoginContainer = props => <LoginView {...props} />;

const mapStateToProps = state => ({
  isFormInvalid: state.loginReducer.isFormInvalid,
  msgDeErro: state.loginReducer.msgDeErro,
});

const mapDispatchToProps = dispatch => ({ login: user => dispatch(login(user)) });

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

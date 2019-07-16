import React from 'react';
import { connect } from 'react-redux';
import LogoutView from './LogoutView';
import { logout } from '../../../../actions';

const LogoutContainer = props => <LogoutView {...props} />;

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({ logout: () => dispatch(logout()) });

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);

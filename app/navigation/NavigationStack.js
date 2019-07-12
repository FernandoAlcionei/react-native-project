import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Login from '../features/login/containers/LoginContainer';

class NavigationStack extends Component {
  state = {};

  render() {
    return (
      <Router>
        <Stack key="root" headerLayoutPreset="center">
          <Scene key="login" component={Login} hideNavBar />
        </Stack>
      </Router>
    );
  }
}

export default connect()(NavigationStack);

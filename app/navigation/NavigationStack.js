import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import Login from '../features/login/containers/LoginContainer';
import Onboarding from '../features/onboarding/containers/OnboardingContainer';
import Fazendas from '../features/fazenda/lista/containers/FazendasContainer';
import BuscaDeFazendas from '../features/fazenda/busca/containers/BuscaDeFazendasContainer';
import ButtonIcon from '../components/ButtonIcon';
import FiltroDeFazenda from '../features/fazenda/filtro/containers/FiltroContainer';
import LimparFiltroContainer from '../features/fazenda/filtro/commons/components/LimparFiltro/containers/LimparFiltroContainer';
import Fazenda from '../features/fazenda/detalhes/containers/FazendaContainer';

import AppStyles from '../config/styles';
import styles from './styles';

const { headers: { HEADER_DEFAULT } } = AppStyles;
const BACK_TITLE_EMPTY = ' ';

class NavigationStack extends Component {
  state = {};

  changeStatusBarColor = color => StatusBar.setBarStyle(color, false);

  statusBarDark = () => this.changeStatusBarColor('dark-content');

  statusBarLight = () => this.changeStatusBarColor('light-content');

  renderButtonIcon = (route, icon) => (
    <ButtonIcon icon={icon} onPress={() => Actions.push(route)} height={35} sizeIcon={21} color={HEADER_DEFAULT.COLOR} />
  );

  render() {
    return (
      <Router backTitle={BACK_TITLE_EMPTY} tintColor={HEADER_DEFAULT.COLOR} navigationBarStyle={styles.navBarDefault}>
        <Stack key="root" headerLayoutPreset="center">
          <Scene key="login" component={Login} hideNavBar />
          <Scene key="onboarding" component={Onboarding} hideNavBar />
          <Scene
            key="fazendas"
            component={Fazendas}
            title="Fazendas"
            onEnter={this.statusBarLight}
            renderLeftButton={() => this.renderButtonIcon('buscaDeFazendas', 'ios-search')}
            renderRightButton={() => this.renderButtonIcon('filtroDeFazenda', 'ios-options')}
          />
          <Scene key="fazenda" component={Fazenda} />
          <Scene key="buscaDeFazendas" component={BuscaDeFazendas} onEnter={this.statusBarDark} hideNavBar />
          <Scene key="filtroDeFazenda" component={FiltroDeFazenda} title="Filtros" onEnter={this.statusBarLight} renderRightButton={<LimparFiltroContainer />} />
        </Stack>
      </Router>
    );
  }
}

export default connect()(NavigationStack);

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import NavigationStack from './app/navigation/NavigationStack';
import configureStore from './app/store';

const { persistor, store } = configureStore();

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationStack />
        </PersistGate>
      </Provider>
    );
  }
}

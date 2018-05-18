import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { YellowBox } from 'react-native';

import Navigation from './src/layouts/index';
import store from './src/store';


const persistor = persistStore(store);

const App = () => {
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

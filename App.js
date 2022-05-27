import * as React from 'react';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';

import configureStore from './src/redux/store';

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

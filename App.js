import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from './src/Redux/Reducers/reducer';
import Main from './src/Components/Main';

const store = createStore(reducer);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
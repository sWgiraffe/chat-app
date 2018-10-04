import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedApp } from './components/App';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import { logger, socketMiddleware } from './middleware';
import { getInitialState, saveToStorage } from './store';
import { setState, newMessage } from './actionCreator';
import { socket } from './io';

const createStoreWithMiddleware = applyMiddleware(
  logger,
  socketMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(rootReducer, getInitialState());

socket.on('state', state => {
  store.dispatch(setState(state));
});

socket.on('message', message => {
  console.log('get message from server');
  store.dispatch(newMessage(message, true));
});

var $app = document.getElementById('app');

export function render() {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    $app
  );
}

render();

store.subscribe(() => {
  saveToStorage(store.getState());
});
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';

const socket = io('http://10.0.1.18:3030/', {
  transports: ['websocket'],
  pingInterval: 10000,
  pingTimeout: 50000,
});

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(auth({
    storage: AsyncStorage,
  }));

feathersClient.hooks({
  error(hook) {
    if (hook.error.className === 'not-authenticated') {
      console.log('not-authenticated');
    }
  },
});

export default {
  auth: feathersClient.authenticate,
  logout: feathersClient.logout,
  users: feathersClient.service('users'),
  bills: feathersClient.service('bills'),
  billStatuses: feathersClient.service('bill-statuses'),
  menuItems: feathersClient.service('menu-items'),
  menuItemStatuses: feathersClient.service('menu-item-statuses'),
  menuCategories: feathersClient.service('menu-categories'),
  surveyRates: feathersClient.service('survey-rates'),
  surveys: feathersClient.service('surveys'),
};


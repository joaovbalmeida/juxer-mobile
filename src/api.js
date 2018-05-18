import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';

const socket = io('http://10.0.1.18:3030/', {
  transports: ['websocket'],
  pingInterval: 10000,
  pingTimeout: 50000,
});

const feathersClient = feathers()
  .configure(socketio(socket))
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
};

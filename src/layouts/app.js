import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/login';

const AuthStack = createStackNavigator({
  Main: MainScreen,
});

export default AuthStack;

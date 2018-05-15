import { createSwitchNavigator } from 'react-navigation';
import AuthStack from './auth';

export default createSwitchNavigator({
  Auth: AuthStack,
}, {
  initialRouteName: 'AuthStack',
});

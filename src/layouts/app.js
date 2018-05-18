import { createStackNavigator } from 'react-navigation';

import CheckinScreen from '../screens/checkin';
import HostStack from './host';
import GuestStack from './guest';

const AppStack = createStackNavigator({
  Checkin: CheckinScreen,
  Host: HostStack,
  Guest: GuestStack,
}, {
  initialRouteName: 'Checkin',
});

export default AppStack;

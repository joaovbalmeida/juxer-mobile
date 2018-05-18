import { createBottomTabNavigator } from 'react-navigation';

import SettingsScreen from '../screens/settings';

const GuestRoute = createBottomTabNavigator({
  Settings: SettingsScreen,
});

export default GuestRoute;

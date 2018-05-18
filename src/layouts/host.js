import { createBottomTabNavigator } from 'react-navigation';

import SettingsScreen from '../screens/settings';

const HostRoute = createBottomTabNavigator({
  Settings: SettingsScreen,
});

export default HostRoute;
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  logout: logoutAction,
  resetRoute: resetRouteAction,
} = actions;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text>this.props.user.name</Text>
        <Button
          title={`Mudar para ${this.props.route === 'Host' ? 'Convidado' : 'Jukebox'}`}
          onPress={() => {
            this.props.navigation.navigate('Auth');
          }}
        />
        <Button
          title="Logout"
          onPress={() => {
            this.props.logout();
            this.props.resetRoute();
            this.props.navigation.navigate('Auth');
          }}
        />
      </View>
    );
  }
}

Settings.propTypes = {
  logout: PropTypes.func.isRequired,
  resetRoute: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const SettingsConnector = connect(state => (
  {
    user: state.auth.user.data,
    route: state.session.route,
  }
), dispatch => (
  {
    logout: () => (
      dispatch(logoutAction())
    ),
    resetRoute: () => (
      dispatch(resetRouteAction())
    ),
  }
))(Settings);

export default SettingsConnector;

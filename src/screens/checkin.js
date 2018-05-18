import React, { Component } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './../store/actions';

const { updateRoute: updateRouteAction } = actions;

class Checkin extends Component {
  componentDidMount() {
    if (this.props.route !== '') {
      this.props.navigation.navigate(this.props.route);
    }
  }

  render() {
    if (this.props.route.length) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <Button
          title="Host"
          onPress={() => {
            this.props.updateRoute('Host');
            this.props.navigation.navigate('Host');
          }}
        />
        <Button
          title="Guest"
          onPress={() => {
            this.props.updateRoute('Guest');
            this.props.navigation.navigate('Guest');
          }}
        />
      </View>
    );
  }
}

Checkin.propTypes = {
  route: PropTypes.string.isRequired,
  updateRoute: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const CheckinConnector = connect(state => (
  {
    route: state.session.route,
  }
), dispatch => (
  {
    updateRoute: route => (
      dispatch(updateRouteAction(route))
    ),
  }
))(Checkin);

export default CheckinConnector;

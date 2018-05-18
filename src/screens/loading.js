import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './../store/actions';

const { checkToken: checkTokenAction } = actions;

class Loading extends Component {
  componentDidMount() {
    Promise.resolve(this.props.checkToken(this.props.token))
      .then((response) => {
        console.log('Token checked');
        if (!response.code) {
          this.props.navigation.navigate('App');
        } else {
          this.props.navigation.navigate('Auth');
        }
      }).catch(() => {
        console.log('Token invalid');
        this.props.navigation.navigate('Auth');
      });
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

Loading.propTypes = {
  token: PropTypes.string.isRequired,
  checkToken: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const LoadingConnector = connect(state => (
  {
    token: state.auth.token.data,
  }
), dispatch => (
  {
    checkToken: token => (
      dispatch(checkTokenAction(token))
    ),
  }
))(Loading);

export default LoadingConnector;

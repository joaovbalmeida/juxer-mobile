import React, { Component } from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import actions from '../store/actions';

const {
  login: loginAction,
  passportLogin: passportLoginAction,
} = actions;

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      provider: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.graphCallback = this.graphCallback.bind(this);
  }

  handleLogin() {
    this.setState({
      error: '',
    });
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      console.log(response);
      if (response.message && response.code.toString().startsWith('4')) {
        console.log(response.message);
        this.setState({
          error: 'Credenciais inválidas',
        });
      }
    });
  }

  handlePassportLogin(email, name, facebookId, picture, token) {
    this.setState({
      error: '',
    });
    this.props.passportLogin({
      email,
      name,
      facebookId,
      picture,
    }, token, this.state.provider).then((response) => {
      if (response.message && response.code !== (409 || 500)) {
        console.log(response.message);
        this.setState({ error: 'Credenciais inválidas' });
      }
    });
  }

  graphCallback(error, result) {
    if (error) {
      this.setState({ error });
    } else {
      AccessToken.getCurrentAccessToken().then((token) => {
        this.handlePassportLogin(
          result.email,
          result.name,
          result.id,
          `/${result.id}/picture?type=square`,
          token.accessToken.toString(),
        );
      }, e => this.setState({ error: e }));
    }
  }

  facebookLogin() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
      if (result.isCancelled) {
        this.setState({ error: 'Login cancelled' });
      } else {
        this.setState({ provider: 'facebook' });
        const graphRequest = new GraphRequest(
          '/me',
          {
            parameters: {
              fields: {
                string: 'email,name,first_name,middle_name,last_name',
              },
            },
          },
          this.graphCallback,
        );
        new GraphRequestManager().addRequest(graphRequest).start();
      }
    }, error => this.setState({ error: `${error}` }));
  }

  render() {
    return (
      <View>
        <Text>
          {this.state.error}
        </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title="Login"
          onPress={this.handleLogin}
        />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate('Register')}
        />
        <Button
          title="FacebookLogin"
          onPress={() => this.facebookLogin()}
        />
      </View>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  passportLogin: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const LoginConnector = connect(state => (
  {
    auth: state.auth.authenticated,
  }
), dispatch => (
  {
    login: credentials => (
      dispatch(loginAction(credentials))
    ),
    passportLogin: (credentials, token, provider) => (
      dispatch(passportLoginAction(credentials, token, provider))
    ),
  }
))(Login);

export default LoginConnector;

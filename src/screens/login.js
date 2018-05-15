import React, { Component } from 'react';
import { View, Button } from 'react-native';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <View>
        <Button
          title="Login"
        />
      </View>
    );
  }
}

export default Login;

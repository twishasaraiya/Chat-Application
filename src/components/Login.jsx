import React from 'react';
import {Card, CardText, RaisedButton} from 'material-ui';
import Actions from '../actions';

class Login extends React.Component{
  onClick(){
    Actions.login();
  }

  render(){
    return(
      <Card style={{
        'macWidth':'800px',
        'margin':'30px auto',
        'padding':'50px'
      }}>
        <CardText style={{
          'textAlign':'center'
        }}>
          To start chatting away, please login with your google account
        </CardText>

        <RaisedButton
          onClick={this.onClick.bind(this)}
          label="Login with google account"
          secondary={true}
          style={{
            display:'block'
        }} />
      </Card>
    );
  }
}

module.exports = Login;

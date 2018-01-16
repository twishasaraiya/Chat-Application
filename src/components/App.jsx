//On the command line run using webpack-dev-server --progress --colors
import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import connectToStores from 'alt-utils/lib/connectToStores';
import ChatStore from '../stores/ChatStore';


@connectToStores
class App extends React.Component{
  constructor(){
    super();
  }

  static getStores(){
    return [ChatStore];
  }

  static getPropsFromStores(){
    return ChatStore.getState();
  }

  render(){
    var view = <Login />;

    if(this.props.user){
      view=<Chat />
    }
    return(
      <MuiThemeProvider>
        <AppBar title="Awesome Chat App" />
        {view}
      </MuiThemeProvider>
    );
  }
}

export default App;

import Actions from '../actions';
import firebase from '../components/firebase.js';

var firebaseRef=null;


let MessageSource ={
  sendMessage:{
    remote(state){
      return new Promise((resolve,reject)=>{
        if(!firebaseRef){
          return resolve();
        }

        firebaseRef.push({
          "message":state.message,
          "date":new Date().toUTCString(),
          "author":state.user.displayName,
          "userId":state.user.uid,
          "profilePic":state.user.photoURL
        });

        resolve();
      });
    },
    success:Actions.messageSendSuccess,
    error:Actions.messageSendError
  },
  getMessages:{
    remote(state){
      if(firebaseRef){
        firebaseRef.off();
      }
      console.log('[MessageSource]selectedChannel->',state.selectedChannel.key);
      firebaseRef=firebase.database().ref('messages/'+state.selectedChannel.key);

      return new Promise((resolve,reject)=>{
        firebaseRef.once('value',(snapshot)=>{
          console.log('snapshot',snapshot);
          var messages=snapshot.val();
          console.log('[MessageSource]messages->',messages);
          resolve(messages);

          firebaseRef.on("child_added",(msg)=>{
            //msg.key was earlier a function but now it is a read-only property
            let msgVal=msg.val();
            msgVal.key=msg.key;
            Actions.newMessageReceived(msgVal);
          });
        });
      });
    },
    success: Actions.messagesReceived,
    error: Actions.messagesFailed,
    loading:Actions.messagesLoading
  }
}

export default MessageSource;

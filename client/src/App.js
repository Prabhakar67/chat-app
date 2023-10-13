import './App.css';
import io from 'socket.io-client';

// in funtional component useeffect is getting called twice 
// import { useState, useEffect } from 'react';

// const socket = io.connect('http://localhost:3001');

// function App() {
//   let arr = [];
//   const [msg, setmsg] = useState('');

//   function sendMessage() {
//     socket.emit('sendMessage', msg);
//     console.log(msg);
//     document.getElementById('user2').innerHTML = msg;
//   };

//   useEffect(() => {
//     socket.on('receiveMessage', (data) => {
//       document.getElementById('container').innerHTML = data;
//       arr.push(data);
//       console.log(arr);
//     },[socket])
//   });

//   return (
//     <>
//       <h1>This is Chat App</h1>
//       <h2 id='container'></h2>
//       <h2 id='user2'></h2>
//       <input onChange={(e) => { setmsg(e.target.value) }} placeholder='message...' />
//       <button onClick={sendMessage}>Send</button>
//     </>
//   );
// }

// export default App;


import React, { Component } from 'react';


const socket = io.connect('http://localhost:3001');
let receivedMsgArray = [];
let sendMsgArray = []
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    }

  }


  sendMessage() {
    socket.emit('sendMessage', this.state.msg);
    this.appendMsg(this.state.msg, 'right');
    sendMsgArray.push(this.state.msg);
    console.log(sendMsgArray);
  };

  componentWillMount() {
    socket.on('receiveMessage', (data) => {
      this.appendMsg(data, 'left');
      receivedMsgArray.push(data);
      console.log(receivedMsgArray);
    })
  }

  appendMsg(msg, position) {
    let container = document.getElementById('container');
    let msgEl = document.createElement('h1');
    msgEl.innerText = msg;
    msgEl.classList.add('message');
    msgEl.classList.add(position);
    container.append(msgEl);
    document.getElementById('textInput').value = '';
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps || nextState) {
      return true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    return (
      <div id='main_container'>
        <div id="header">
          <h1>This is Chat App</h1>
        </div>
        <div id='container'></div>
        <div id='footer'>
          <input id='textInput' onChange={(e) => { this.setState({ msg: e.target.value }) }} placeholder='message...' />
          <button id='sendBtn' onClick={this.sendMessage.bind(this)}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;
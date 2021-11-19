import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button
} from 'react-native';
import {AddToDo} from '../../src/AddToDo'
import {Todo} from '../../src/Todo'
import {ConnectWeb} from '../../src/ConnectWeb'
import * as Clipboard from 'expo-clipboard';

var ws = new WebSocket('ws://192.168.1.40:9090/');

var web_id;
var client_id
var status_mobile_connection = 1

export default function InfoScreen({route}) {

  const setWebId = title => {

    web_id = title
    ws.onopen = () => {
      console.log("New connection to web")
    };
  }
  // console.log(route)
  if (route.params == undefined) {
    console.log("no scan")
  } else if (web_id != route.params.web_id) {
    console.log("Scanned")
    console.log("Recive web_id = " + route.params.web_id)
    ws = new WebSocket('ws://192.168.1.40:9090/');
    setWebId(route.params.web_id)
  } else {
    // ws = new WebSocket('ws://192.168.1.40:9090/');
  }

  ws.onmessage = (e) => {
    // a message was received

    var data = JSON.parse(e.data)
    client_id = data.web_id
    console.log("Mobile ID = " + data.web_id);
    console.log("Message received [JSON]: " + e.data);
    console.log("Message received [DATA]: " + data.data);
    // console.log("HUY");
    addTodoRecived(data.data, 1)
    if (status_mobile_connection == 1) {
      var message_start = '{"status": "debug","web_id": ' + web_id + ',"client_id": ' + client_id + ',"data": "Mobile connect"}'
      ws.send(message_start); // send a message
      console.log("Send Data to web", message_start)
    }
    status_mobile_connection = 0
  };

  const [todos, setTodos] = useState([])

  const addTodoRecived = (title, status) => {
    setTodos(prev => [
      ...prev, {
        id: Date.now().toString(),
        title
      }
    ])
  }
  const addTodo = (title, status) => {
    setTodos(prev => [
      ...prev, {
        id: Date.now().toString(),
        title
      }
    ])
    var message = '{"status": "debug","web_id": ' + web_id + ',"client_id": ' + client_id + ',"data": "' + title + '"}'
    ws.send(message); // send a message
    console.log(status)

    ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
    console.log("Send message WS")
  }

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const copyTodo = title => {
    Clipboard.setString(title);
    console.log(title)
  }

  return (<View style={styles.container}>
    <AddToDo onSubmit={addTodo}/>
    <FlatList keyExtractor={item => item.id} data={todos} renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onCopy={copyTodo}/>}/>

    <StatusBar style="auto"/>
  </View>);
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  text: {
    color: '#0c5211',
    fontSize: 26
  },
  barcodebox: {
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',

    height: 300,
    width: 300,
    margin: 20,
    borderRadius: 10
  }
});

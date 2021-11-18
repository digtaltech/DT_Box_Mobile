import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export const Todo = ({todo, onRemove, onCopy}) => {

  const longPressHandler = () => {
    onRemove(todo.id)
  }
  const shortPressHandler = () => {
    onCopy(todo.title)
  }


  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onCopy.bind(null, todo.title)}
        onLongPress={() => console.log('Pressed', todo.id)}
        >
        <View style={styles.todo}>
          <Text>{todo.title}</Text>
          <TouchableOpacity onPress={onRemove.bind(null, todo.id)}>
            <View style={styles.button_del}>
              <Text style={styles.button_text}>X</Text>
            </View>
          </TouchableOpacity>
        </View>

      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#D2DDEC',
    borderRadius: 8,
    marginBottom: 5
  },
  button_del: {

    backgroundColor: '#2C7BE5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 25,
    width: 25,
  },
  button_text: {
    color: 'white',
    fontSize: 12
  }
})

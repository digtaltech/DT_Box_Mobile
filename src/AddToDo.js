import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text
} from 'react-native'

export const AddToDo = ({onSubmit}) => {

  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
    } else {
      Alert.alert('Название задачи не может быть пустым')
    }

  }

  return (<View style={styles.block}>
    <TextInput style={styles.input} onChangeText={setValue} value={value} placeholder="Введите данные для передачи ..." placeholderTextColor="#6E84A3" />
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.button}>
        <Text style={styles.button_text}>Отправить</Text>
      </View>
    </TouchableOpacity>

  </View>)
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    width: '69%',
    height: 35,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "#D2DDEC",
    borderRadius: 6,
    paddingLeft: 10,

  },
  button: {
    backgroundColor: '#2C7BE5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 35,
    width: 100,
  },
  button_text: {
    color: 'white',
    fontSize: 14
  }
})

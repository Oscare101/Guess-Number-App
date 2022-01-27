import { React } from 'react'
import { StyleSheet, TextInput } from 'react-native'

export default function Input(props) {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderColor: '#444',
    marginVertical: 10,
  },
})

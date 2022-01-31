import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'
import colors from '../constans/colors'

export default function MainButton(props) {
  let ButtonComponent = TouchableOpacity

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback
  }

  return (
    <View style={{ borderRadius: 25, overflow: 'hidden' }}>
      <ButtonComponent activeOpacity={0.6} onPress={() => props.onPress()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
})

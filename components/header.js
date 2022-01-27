import { React } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../constans/colors'
import TitleText from '../components/titleText'

export default function Header(props) {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
})

import { React } from 'react'
import { StyleSheet, Text, View, Platform, PlatformColor } from 'react-native'
import colors from '../constans/colors'
import TitleText from '../components/titleText'

export default function Header(props) {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText>{props.title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    //backgroundColor: Platform.OS == 'android' ? colors.primary : '#fff',
    alignItems: 'center',
  },
  headerIOS: { backgroundColor: '#fff' },
  headerAndroid: { backgroundColor: colors.primary },
})

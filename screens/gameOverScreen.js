import React, { useState, useEffect } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'
import BodyText from '../components/bodyText'
import MainButton from '../components/mainButton'
import TitleText from '../components/titleText'
import colors from '../constans/colors'

export default function GameOverScreen(props) {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)
  deviceWidth
  useEffect(() => {
    function updateLayout() {
      setDeviceWidth(Dimensions.get('window').width)
    }

    Dimensions.addEventListener('change', updateLayout)
  })

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The game is over</TitleText>
        <View
          style={[
            styles.imageView,
            {
              width: deviceWidth * 0.7,
              height: deviceWidth * 0.7,
              borderRadius: (deviceWidth * 0.7) / 2,
            },
          ]}
        >
          <Image
            source={require('../assets/success.png')}
            // source={{
            //   uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg',
            // }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultcontainer}>
          <BodyText style={styles.resultText}>
            Number of rounds:{' '}
            <Text style={styles.highlight}>{props.roundsNumber}</Text>
            {'\n'}
            Number was: <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>New game</MainButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageView: {
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#000',
    marginVertical: Dimensions.get('window').height / 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultcontainer: {
    width: '80%',
    alignItems: 'center',
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height > 400 ? 20 : 16,
    marginVertical: 15,
  },
})

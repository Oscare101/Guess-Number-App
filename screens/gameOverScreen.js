import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, Image } from 'react-native'
import BodyText from '../components/bodyText'
import MainButton from '../components/mainButton'
import TitleText from '../components/titleText'
import colors from '../constans/colors'

export default function GameOverScreen(props) {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over</TitleText>
      <View style={styles.imageView}>
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
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: 300,
    height: 300,
    borderRadius: 200,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#000',
    marginVertical: 30,
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
    fontSize: 20,
    marginVertical: 15,
  },
})

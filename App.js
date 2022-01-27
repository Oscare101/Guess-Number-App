import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './components/header'
import StartGameScreen from './screens/startGameScreen'
import GameScreen from './screens/gameScreen'
import GameOverScreen from './screens/gameOverScreen'

import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

function fetchFonts() {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  function configureNewGame() {
    setGuessRounds(0)
    setUserNumber(null)
  }

  function startGame(selectedNumber) {
    setUserNumber(selectedNumber)
  }

  function gameOver(numOfRounds) {
    setGuessRounds(numOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGame} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOver} />
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGame}
      />
    )
  }

  return (
    <View style={styles.screen}>
      <StatusBar />
      <Header title="Guess a number" />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

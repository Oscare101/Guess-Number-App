import { React, useState, useRef, useEffect } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native'
import { ScreenOrientaion } from 'expo'

import Card from '../components/card'
import NumberConatiner from '../components/numberContainer'
import DefaultStyles from '../constans/defaultStyles'
import { Ionicons } from '@expo/vector-icons'
import BodyText from '../components/bodyText'
import colors from '../constans/colors'

function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randomNumber = Math.floor(Math.random() * (max - min) + min)
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return randomNumber
  }
}

function renderListItem(listLengh, itemData) {
  return (
    <View style={styles.listItem}>
      <BodyText>#{listLengh - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  )
}

export default function GameScreen(props) {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get('window').height
  )
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props //

  useEffect(() => {
    function updateLayout() {
      setDeviceHeight(Dimensions.get('window').height)
      setDeviceWidth(Dimensions.get('window').width)
    }

    Dimensions.addEventListener('change', updateLayout)
  })

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  function nextGuess(direction) {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'sorry', style: 'cancel' },
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )
    setCurrentGuess(nextNumber)
    //setRounds((currentRounds) => currentRounds + 1)
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ])
  }

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => {
              nextGuess('lower')
            }}
          >
            <View style={styles.button}>
              <Ionicons name="arrow-down-sharp" size={30} color="#fff" />
              <Text style={styles.textButton}> LOWER </Text>
            </View>
          </TouchableOpacity>
          <NumberConatiner>{currentGuess}</NumberConatiner>
          <TouchableOpacity
            onPress={() => {
              nextGuess('greater')
            }}
          >
            <View style={styles.button}>
              <Ionicons name="arrow-up-sharp" size={30} color="#fff" />
              <Text style={styles.textButton}>GREATER</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberConatiner>{currentGuess}</NumberConatiner>
      <Card style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            nextGuess('lower')
          }}
        >
          <View style={styles.button}>
            <Ionicons name="arrow-down-sharp" size={30} color="#fff" />
            <Text style={styles.textButton}> LOWER </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            nextGuess('greater')
          }}
        >
          <View style={styles.button}>
            <Ionicons name="arrow-up-sharp" size={30} color="#fff" />
            <Text style={styles.textButton}>GREATER</Text>
          </View>
        </TouchableOpacity>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
  },
  list: {
    flexGrow: 1,
    //alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
  },
})

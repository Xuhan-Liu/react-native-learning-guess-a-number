import React, { useState, useRef, useEffect } from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
  const [guessRound, setGuessRound] = useState(0)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guessRound)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
        {
          text: 'Sorry!', style: 'cancel'
        }
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    }
    if (direction === 'greater') {
      currentLow.current = currentGuess
    }
    const newGuess = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(newGuess)
    setGuessRound(curState => curState + 1)
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <Button title={'LOWER'} onPress={nextGuessHandler.bind(this, 'lower')}/>
        <Button title={'GREATER'} onPress={nextGuessHandler.bind(this, 'greater')}/>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
})

export default GameScreen

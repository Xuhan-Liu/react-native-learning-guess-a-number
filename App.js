import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

export default function App () {
  const [selectedNumber, setSelectedNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

  const startGameHandler = number => {
    setSelectedNumber(number)
    setGuessRounds(0)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  const restartGameHandler = () => {
    setGuessRounds(0)
    setSelectedNumber(null)
  }

  let content = <StartGameScreen onConfirm={startGameHandler}/>

  if (selectedNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={selectedNumber} onGameOver={gameOverHandler}/>
  } else if (guessRounds > 0) {
    content = <GameOverScreen rounds={guessRounds} userNumber={selectedNumber} restart={restartGameHandler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

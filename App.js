import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App () {

  const [selectedNumber, setSelectedNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)}/>
  }

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
  // let content = <GameOverScreen rounds={guessRounds} userNumber={selectedNumber} restart={restartGameHandler}/>

  if (selectedNumber && guessRounds
    <= 0) {
    content =
      <GameScreen userChoice={selectedNumber} onGameOver={gameOverHandler}/>
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
    flex: 1,
  }
})

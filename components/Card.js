import React from 'react'
import { StyleSheet, View } from 'react-native'

const Card = props => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  }
})

export default Card

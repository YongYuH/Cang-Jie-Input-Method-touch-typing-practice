import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'

import CangJieKeyboard from './CangJieKeyboard'
import ChineseCharacterToEnglishKey from './ChineseCharacterToEnglishKey.json'
import Grid from './components/Grid'
import RadicalQuestion, { ChineseCharacterMapping } from './RadicalQuestion'
import { radicalReducer } from './radicalReducer'
import TypingRadicalPreview from './TypingRadicalPreview'

const KeyboardWrapper = styled.div`
  max-width: 600px;
`

const randomNumber = 0

const defaultCurrentSelectedChineseCharacterPair = Object.entries(
  ChineseCharacterToEnglishKey
)[randomNumber]

const defaultCurrentSelectedChineseCharacterMapping = {
  [defaultCurrentSelectedChineseCharacterPair[0]]:
    defaultCurrentSelectedChineseCharacterPair[1],
}

const App = () => {
  const [currentSelectedChineseCharacterMapping] =
    useState<ChineseCharacterMapping>(
      defaultCurrentSelectedChineseCharacterMapping
    )
  const maxLength = Object.values(currentSelectedChineseCharacterMapping)[0]
    .length
  const [state, dispatch] = useReducer(radicalReducer, {
    currentIndex: 0,
    cumulated: Array(maxLength).fill(' '),
    maxLength,
  })

  const hanleKeyDown = (event: KeyboardEvent) => {
    dispatch({
      type: 'typing',
      payload: {
        currentPressedKey: event.key,
      },
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', hanleKeyDown)
    return () => {
      window.removeEventListener('keydown', hanleKeyDown)
    }
  }, [])

  return (
    <Grid gridRowGap="32px">
      <RadicalQuestion mapping={currentSelectedChineseCharacterMapping} />
      <TypingRadicalPreview cumulated={state.cumulated} />
      <KeyboardWrapper>
        <CangJieKeyboard />
      </KeyboardWrapper>
    </Grid>
  )
}

export default App

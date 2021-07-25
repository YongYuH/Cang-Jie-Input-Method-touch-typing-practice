import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'

import CangJieKeyBinding from './CangJieKeyBinding.json'
import CangJieKeyboard from './CangJieKeyboard'
import ChineseCharacterToEnglishKey from './ChineseCharacterToEnglishKey.json'
import Grid from './components/Grid'
import RadicalQuestion from './RadicalQuestion'
import { radicalReducer } from './radicalReducer'
import TypingRadicalPreview from './TypingRadicalPreview'

const KeyboardWrapper = styled.div`
  max-width: 600px;
`

const randomNumber = 0

interface SelectedChineseCharacterMapping {
  character: string
  radicalList: string[]
}

type GetSelectedChineseCharacterPair = (
  randomNumber: number
) => SelectedChineseCharacterMapping
const getSelectedChineseCharacterMapping: GetSelectedChineseCharacterPair = (
  randomNumber
) => {
  const [character, englishKeyString] = Object.entries(
    ChineseCharacterToEnglishKey
  )[randomNumber]
  const radicalList = englishKeyString
    .split('')
    .map((key) => CangJieKeyBinding[key])

  return { character, radicalList }
}

const App = () => {
  const {
    character: currentQuestionChineseCharacter,
    radicalList: currentQuestionRadicalList,
  } = getSelectedChineseCharacterMapping(randomNumber)

  const [state, dispatch] = useReducer(radicalReducer, {
    currentTypingIndex: 0,
    currentQuestionRadicalList,
    cumulated: Array(currentQuestionRadicalList.length).fill(' '),
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
      <RadicalQuestion
        questionChineseCharacter={currentQuestionChineseCharacter}
        radicalList={currentQuestionRadicalList}
      />
      <TypingRadicalPreview
        cumulated={state.cumulated}
        currentIndex={state.currentTypingIndex}
      />
      <KeyboardWrapper>
        <CangJieKeyboard />
      </KeyboardWrapper>
    </Grid>
  )
}

export default App

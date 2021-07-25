import React from 'react'
import styled from 'styled-components'

import CangJieKeyBinding from './CangJieKeyBinding.json'
import Grid from './components/Grid'
import Radical from './components/Radical'

const Title = styled.div`
  font-size: 64px;
`

type GetRadicalList = (englishKeyString: string) => string[]
const getRadicalList: GetRadicalList = (englishKeyString) => {
  return englishKeyString.split('').map((key) => CangJieKeyBinding[key])
}

export type ChineseCharacterMapping = Record<string, string>

interface RadicalQuestionProps {
  mapping: ChineseCharacterMapping
}

const RadicalQuestion = (props: RadicalQuestionProps) => {
  const { mapping } = props

  const [chineseCharacter, englishKeyString] = Object.entries(mapping)[0]

  const radicalList = getRadicalList(englishKeyString)

  return (
    <Grid gridColumnGap="8px">
      <Title>{chineseCharacter}</Title>
      <Grid
        gridAutoColumns="min-content"
        gridAutoFlow="column"
        gridColumnGap="4px"
      >
        {radicalList.map((radical, index) => (
          <Radical key={`question-radical-${index}`}>{radical}</Radical>
        ))}
      </Grid>
    </Grid>
  )
}

export default RadicalQuestion

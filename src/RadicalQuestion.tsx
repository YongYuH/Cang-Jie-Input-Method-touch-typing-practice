import React from 'react'
import styled from 'styled-components'

import Grid from './components/Grid'
import Radical from './components/Radical'

const Title = styled.div`
  font-size: 64px;
`

interface RadicalQuestionProps {
  questionChineseCharacter: string
  radicalList: string[]
}

const RadicalQuestion = (props: RadicalQuestionProps) => {
  const { questionChineseCharacter, radicalList } = props

  return (
    <Grid gridColumnGap="8px">
      <Title>{questionChineseCharacter}</Title>
      <Grid gridAutoColumns="min-content" gridAutoFlow="column" gridColumnGap="4px">
        {radicalList.map((radical, index) => (
          <Radical key={`question-radical-${index}`}>{radical}</Radical>
        ))}
      </Grid>
    </Grid>
  )
}

export default RadicalQuestion

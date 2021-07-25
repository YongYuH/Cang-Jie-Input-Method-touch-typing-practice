import React from 'react'
import styled from 'styled-components'

import Grid from './components/Grid'
import Radical from './components/Radical'
import { CumulatedMap } from './radicalReducer'

interface PlaceholderProps {
  isHighlighted: boolean
}

const Placeholder = styled.div<PlaceholderProps>`
  border-bottom: 4px solid
    ${(props) => (props.isHighlighted ? 'gray' : 'black')};
  width: 20px;
  height: 28px;
`

interface TypingRadicalPreviewProps {
  cumulatedMapList: CumulatedMap[]
  maxLength: number
}

const TypingRadicalPreview = (props: TypingRadicalPreviewProps) => {
  const { cumulatedMapList, maxLength } = props

  const lengthOfPlaceholder = maxLength - cumulatedMapList.length

  return (
    <Grid
      gridAutoColumns="min-content"
      gridAutoFlow="column"
      gridColumnGap="4px"
    >
      {cumulatedMapList.map((cumulatedMap, index) => (
        <Radical
          key={`radical-${index}`}
          state={cumulatedMap.isValid ? 'valid' : 'invalid'}
        >
          {cumulatedMap.radical}
        </Radical>
      ))}
      {Array(lengthOfPlaceholder)
        .fill(' ')
        .map((placeholder, index) => (
          <Placeholder key={`placeholder-${index}`} isHighlighted={index === 0}>
            {placeholder}
          </Placeholder>
        ))}
    </Grid>
  )
}

export default TypingRadicalPreview

import React from 'react'
import styled from 'styled-components'

import Grid from './components/Grid'
import Radical from './components/Radical'

interface PlaceholderProps {
  isHighlighted: boolean
}

const Placeholder = styled.div<PlaceholderProps>`
  border-bottom: 1px solid ${(props) => (props.isHighlighted ? 'red' : 'black')};
  width: 20px;
  height: 27px;
`

interface TypingRadicalPreviewProps {
  cumulated: string[]
  maxLength: number
}

const TypingRadicalPreview = (props: TypingRadicalPreviewProps) => {
  const { cumulated, maxLength } = props

  const lengthOfPlaceholder = maxLength - cumulated.length

  return (
    <Grid
      gridAutoColumns="min-content"
      gridAutoFlow="column"
      gridColumnGap="4px"
    >
      {cumulated.map((radical, index) => (
        <Radical key={`radical-${index}`}>{radical}</Radical>
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

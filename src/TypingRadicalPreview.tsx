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
  currentIndex: number
}

const TypingRadicalPreview = (props: TypingRadicalPreviewProps) => {
  const { cumulated, currentIndex } = props

  return (
    <Grid
      gridAutoColumns="min-content"
      gridAutoFlow="column"
      gridColumnGap="4px"
    >
      {cumulated.map((radical, index) =>
        radical === ' ' ? (
          <Placeholder
            key={`radical-${index}`}
            isHighlighted={index === currentIndex}
          />
        ) : (
          <Radical key={`radical-${index}`}>{radical}</Radical>
        )
      )}
    </Grid>
  )
}

export default TypingRadicalPreview

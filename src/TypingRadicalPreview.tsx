import React from 'react'
import styled from 'styled-components'
import { grid, GridProps } from 'styled-system'

const Grid = styled.div<GridProps>`
  display: grid;
  ${grid}
`

const Placeholder = styled.div`
  border-bottom: 1px solid black;
  width: 20px;
  height: 27px;
`

const Text = styled.div`
  font-size: 20px;
  line-height: 28px;
`

interface TypingRadicalPreviewProps {
  cumulated: string[]
}

const TypingRadicalPreview = (props: TypingRadicalPreviewProps) => {
  const { cumulated } = props

  return (
    <Grid
      gridAutoColumns="min-content"
      gridAutoFlow="column"
      gridColumnGap="4px"
    >
      {cumulated.map((radical, index) =>
        radical === ' ' ? (
          <Placeholder key={`radical-${index}`} />
        ) : (
          <Text key={`radical-${index}`}>{radical}</Text>
        )
      )}
    </Grid>
  )
}

export default TypingRadicalPreview

import React from 'react'
import {Placeholder} from 'semantic-ui-react'

const CardPlaceholder = () => (
  <Placeholder>
    <Placeholder.Header image>
      <Placeholder.Line/>
      <Placeholder.Line/>
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line length='medium'/>
      <Placeholder.Line length='short'/>
    </Placeholder.Paragraph>
  </Placeholder>
)

export default CardPlaceholder

import React from "react";
import {Placeholder} from "semantic-ui-react";

const StudentListPlaceholder = () => {
  return (
    <div>
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line length='very short'/>
          <Placeholder.Line length='medium'/>
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length='short'/>
        </Placeholder.Paragraph>
      </Placeholder>
    </div>
  )
}

export default StudentListPlaceholder
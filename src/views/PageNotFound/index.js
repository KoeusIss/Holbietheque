import React from "react";
import {Container, Header, Image, Segment} from "semantic-ui-react";

const PageNotFound = () => {
  return (
    <div>
      <Container>
        <Segment vertical textAlign="center" style={{ paddingTop: "15rem", paddingBottom: "15rem" }}>
        <Image src={require("../../images/404.svg")} style={{ display: "inline", width: "500px" }}/>
        </Segment>
      </Container>
    </div>
  )
}

export default PageNotFound
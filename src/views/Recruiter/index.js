import React from "react";
import {Container, Segment, Tab, Image, Header, Grid, List, Icon, Button} from "semantic-ui-react";
import "./recruiter.css"
import AboutPane from "./About";
import OpenPane from "./OpenJob";
import ArchivedPane from "./ArchivedJob";

const Recruiter = () => {
  return (
    <Container>
      <Grid columns={2}>
        <Grid.Row style={{paddingTop: "2rem"}}>
          <Grid.Column width={2}>
            <Image src={"https://i.stack.imgur.com/NC3AA.png"} style={{width: "150px"}}/>
          </Grid.Column>
          <Grid.Column width={11}>
            <Header style={{marginTop: "5px"}} as="h2">Amazon web service
              <Header.Subheader>Integrated platform for tech teams to ship faster & improve their engineering
                productivity</Header.Subheader></Header>
            <List horizontal relaxed>
              <List.Item>
                <List.Content>
                  <List.Header>Web site</List.Header>
                  <List.Description>http://www.amazon.com</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Headquarter</List.Header>
                  <List.Description>Seattle, WA</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Company size</List.Header>
                  <List.Description>Between 500-1000 employee</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Founded</List.Header>
                  <List.Description>1994</List.Description>
                </List.Content>
              </List.Item>
            </List>
          
          </Grid.Column>
          <Grid.Column width={3}>
            <Button icon basic labelPosition="left">
                  <Icon name="pencil"/>
                  Edit profile
                </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment vertical className="panes">
        <Tab menu={{secondary: true, pointing: true}} panes={[
          {
            menuItem: 'About',
            render: () => <AboutPane/>,
          },
          {
            menuItem: 'Open job',
            render: () => <OpenPane/>,
          }
        ]}/>
      </Segment>
    
    </Container>
  )
}

export default Recruiter
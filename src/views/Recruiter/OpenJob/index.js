import React from "react";
import {Segment, Header, Grid, Menu, Image, List, Button, Icon, Divider, Label} from "semantic-ui-react";

const jobs = [
  {
    "title": "Marketing Internship Summer",
    "location": "Amazon – Seattle, WA",
    "published_at": "6 hours ago",
    "salary": "$55K-$108K"
  },
  {
    "title": "Ops Manager,Operations",
    "location": "Amazon – Buford, GA",
    "published_at": "6 hours ago",
    "salary": "$55K-$108K"
  }
]
const company_img = "https://i.stack.imgur.com/NC3AA.png"
const OpenPane = () => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Menu text fluid style={{marginTop: "0"}}>
              <Menu.Item position="right">
                <Button icon basic labelPosition="left">
                  <Icon name="plus"/>
                  Add new job
                </Button>
              </Menu.Item>
            </Menu>
            <Segment>
              <List relaxed='very' divided>
                {jobs.map((job, index) => {
                  return (
                    <List.Item>
                      <Image size="mini" src={company_img}/>
                      <List.Content>
                        <List.Header>{job.title}</List.Header>
                        <List.Description>
                          {job.location}
                        </List.Description>
                        <List.Description style={{marginTop: "6px"}}>
                          {job.salary}
                        </List.Description>
                        <List.Description style={{marginTop: "10px"}}>
                        <Label.Group>
                          <Label>Python</Label>
                          <Label>ReactJS</Label>
                          <Label>AWS</Label>
                          <Label>GCP</Label>
                        </Label.Group>
                      </List.Description>
                      </List.Content>
                      
                      <List.Content floated={"right"}>
                        <Button basic icon><Icon name="pencil"/></Button>
                        <Button basic icon><Icon name="trash"/></Button>
                      </List.Content>
                    </List.Item>
                  )
                })}
              </List>
            </Segment>
          
          </Grid.Column>
          <Grid.Column width={4}>
            <Menu vertical fluid>
              <Menu.Item>
                <Header as='h4'>Stacks</Header>
              </Menu.Item>
              <Menu.Item>
                <Header as='h4'>Office locations</Header>
              </Menu.Item>
              <Menu.Item>
                <Header as='h4'>Company benefits</Header>
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    
    </div>
  )
}

export default OpenPane
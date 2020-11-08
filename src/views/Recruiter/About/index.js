import React from "react";
import {Segment, Header, List, Grid, Menu, Dropdown, Button, Icon} from "semantic-ui-react";
import AddAbout from "./add_about";
import AddCoreValues from "./add_core_values";
import AddOurMission from "./add_our_mission";
import AddInterviewProcess from "./add_interview_process";

const stacks = ["DevOps", "Web Development", "Cloud", "AI", "Machine learning"]

const AboutPane = ({userID, recruiter}) => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Menu text fluid style={{marginTop: "0"}}>
              <Menu.Item position="right">
                <Dropdown
                  button
                  basic
                  link
                  className="icon"
                  floating
                  labeled
                  icon="plus"
                  text="Add to profile"
                >
                  <Dropdown.Menu>
                    <AddAbout
                      theTrigger={<Dropdown.Item text="About section"/>}
                      user_id={userID}
                    />
                    <AddCoreValues
                      theTrigger={<Dropdown.Item text="Core values section"/>}
                      user_id={userID}
                    />
                    <AddOurMission
                      theTrigger={<Dropdown.Item text="Our mission section"/>}
                      user_id={userID}
                    />
                    <AddInterviewProcess
                      theTrigger={<Dropdown.Item text="Interview section"/>}
                      user_id={userID}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Menu>
            {recruiter.about ?
            <Segment>
              <Header>About the company</Header>
              <p>{recruiter.about}</p>
              <Menu text style={{marginTop: "0", marginBottom: "0"}}>
                <Menu.Menu position="right">
                  <Button basic icon><Icon name="pencil"/></Button>
                  <Button basic icon><Icon name="trash"/></Button>
                </Menu.Menu>
              </Menu>
            </Segment> : null}
            {recruiter.our_mission ?
            <Segment>
              <Header>Our mission</Header>
              <p>{recruiter.our_mission}</p>
              <Menu text style={{marginTop: "0", marginBottom: "0"}}>
                <Menu.Menu position="right">
                  <Button basic icon><Icon name="pencil"/></Button>
                  <Button basic icon><Icon name="trash"/></Button>
                </Menu.Menu>
              </Menu>
            </Segment> : null}
            {recruiter.core_values ?
            <Segment>
              <Header>Core values</Header>
              <p>{recruiter.core_values}</p>
              <Menu text style={{marginTop: "0", marginBottom: "0"}}>
                <Menu.Menu position="right">
                  <Button basic icon><Icon name="pencil"/></Button>
                  <Button basic icon><Icon name="trash"/></Button>
                </Menu.Menu>
              </Menu>
            </Segment> : null}
            {recruiter.interview_process ?
            <Segment>
              <Header>Interview process</Header>
              <p>{recruiter.interview_process}</p>
              <Menu text style={{marginTop: "0", marginBottom: "0"}}>
                <Menu.Menu position="right">
                  <Button basic icon><Icon name="pencil"/></Button>
                  <Button basic icon><Icon name="trash"/></Button>
                </Menu.Menu>
              </Menu>
            </Segment> : null}
          </Grid.Column>
          <Grid.Column width={4}>
            <Menu vertical fluid>
              <Menu.Item>
                <Header as='h4'>Stacks</Header>
                {stacks.map((stack, index) => {
                  return (
                    <p key={index}>{stack}</p>
                  )
                })}
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    
    </div>
  
  )
}

export default AboutPane
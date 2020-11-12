/**
 * About pane
 */
import React from "react";
import DeleteModal from "./delete";
import AddEditSection from "./add_edit_section";
import {
  Segment,
  Header,
  Grid,
  Menu,
  Dropdown,
  Button,
  Icon, Image
} from "semantic-ui-react";

const stacks = ["DevOps", "Web Development", "Cloud", "AI", "Machine learning"]

/**
 * AboutPane component
 * @param {string} userID
 * @param {object} recruiter
 * @returns {JSX.Element}
 * @constructor
 */
const AboutPane = ({userID, recruiter}) => {
  const owner = userID === recruiter.id
  return (
    <div>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={12}>
            <Menu text fluid style={{marginTop: "0"}}>
              {owner &&
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
                    <AddEditSection
                      theTrigger={
                        <Dropdown.Item text="About section" disabled={recruiter.about}/>
                      }
                      recruiter={recruiter}
                      createMode={true}
                      section={'about'}
                    />
                    <AddEditSection
                      theTrigger={
                        <Dropdown.Item text="Core values section" disabled={recruiter.core_values}/>
                      }
                      recruiter={recruiter}
                      createMode={true}
                      section={'core_values'}
                    />
                    <AddEditSection
                      theTrigger={
                        <Dropdown.Item text="Our mission section" disabled={recruiter.our_mission}/>
                      }
                      recruiter={recruiter}
                      createMode={true}
                      section={'our_mission'}
                    />
                    <AddEditSection
                      theTrigger={
                        <Dropdown.Item text="Interview process section" disabled={recruiter.interview_process}/>
                      }
                      recruiter={recruiter}
                      createMode={true}
                      section={'interview_process'}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              }
            </Menu>
            {/* About section */}
            {(recruiter.about || recruiter.core_values || recruiter.our_mission || recruiter.interview_process) ?
              <>
                {recruiter.about &&
                <Segment>
                  <Header>About the company</Header>
                  <p>{recruiter.about}</p>
                  <Menu text style={{marginTop: "0", marginBottom: "0"}}>
                    {owner &&
                    <Menu.Menu position="right">
                      <AddEditSection
                        theTrigger={<Button basic icon><Icon name="pencil"/></Button>}
                        recruiter={recruiter}
                        createMode={false}
                        section={'about'}
                      />
                      <DeleteModal
                        theTrigger={<Button basic icon><Icon name="trash"/></Button>}
                        section={'about'}
                        recruiter={recruiter}
                      />
                    </Menu.Menu>
                    }
                  </Menu>
                </Segment>}
                {/* Our mission section */}
                {recruiter.our_mission &&
                <Segment>
                  <Header>Our mission</Header>
                  <p>{recruiter.our_mission}</p>
                  <Menu text style={{marginTop: "0", marginBottom: "0"}}>
                    {owner &&
                    <Menu.Menu position="right">
                      <AddEditSection
                        theTrigger={<Button basic icon><Icon name="pencil"/></Button>}
                        recruiter={recruiter}
                        createMode={false}
                        section={'our_mission'}
                      />
                      <DeleteModal
                        theTrigger={<Button basic icon><Icon name="trash"/></Button>}
                        section={'our_mission'}
                        recruiter={recruiter}
                      />
                    </Menu.Menu>
                    }
                  </Menu>
                </Segment>}
                {recruiter.core_values &&
                <Segment>
                  <Header>Core values</Header>
                  <p>{recruiter.core_values}</p>
                  <Menu text style={{marginTop: "0", marginBottom: "0"}}>
                    {owner &&
                    <Menu.Menu position="right">
                      <AddEditSection
                        theTrigger={<Button basic icon><Icon name="pencil"/></Button>}
                        recruiter={recruiter}
                        createMode={false}
                        section={'core_values'}
                      />
                      <DeleteModal
                        theTrigger={<Button basic icon><Icon name="trash"/></Button>}
                        section={'core_values'}
                        recruiter={recruiter}
                      />
                    </Menu.Menu>
                    }
                  </Menu>
                </Segment>}
                {/*  Interview process section */}
                {recruiter.interview_process &&
                <Segment>
                  <Header>Interview process</Header>
                  <p>{recruiter.interview_process}</p>
                  <Menu text style={{marginTop: "0", marginBottom: "0"}}>
                    {owner &&
                    <Menu.Menu position="right">
                      <AddEditSection
                        theTrigger={<Button basic icon><Icon name="pencil"/></Button>}
                        recruiter={recruiter}
                        createMode={false}
                        section={'interview_process'}
                      />
                      <DeleteModal
                        theTrigger={<Button basic icon><Icon name="trash"/></Button>}
                        section={'interview_process'}
                        recruiter={recruiter}
                      />
                    </Menu.Menu>
                    }
                  </Menu>
                </Segment>}
              </>
              :
              <Segment placeholder textAlign={"center"}>
                <Image
                  src={require("../../../images/no_data.svg")}
                  size="tiny"
                  style={{margin: "auto"}}
                />
              </Segment>
            }
          </Grid.Column>
          {/* Right side section */}
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
/**
 * About pane
 */
import React, {useState} from "react";
import DeleteModal from "./delete";
import AddEditSection from "./add_edit_section";
import {
  Segment,
  Grid,
  Menu,
  Dropdown,
  Button,
  Icon, Image, Table, Input
} from "semantic-ui-react";
import MDEditor from '@uiw/react-md-editor';

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
  const [hide, setHide] = useState(false)
  
  
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
                  <MDEditor.Markdown source={recruiter.about}/>
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
                  <MDEditor.Markdown source={recruiter.our_mission}/>
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
                {/* Core value section */}
                {recruiter.core_values &&
                <Segment>
                  <MDEditor.Markdown source={recruiter.core_values}/>
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
                  <MDEditor.Markdown source={recruiter.interview_process}/>
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
            <Table>
              <Table.Header>
                <Table.Row>
                  {
                    hide ?
                      <Table.HeaderCell>Stacks</Table.HeaderCell>
                      :
                      <Table.HeaderCell><Input name="name"/></Table.HeaderCell>
                  }
                  <Table.HeaderCell>
                    <Button icon basic onClick={() => setHide(!hide)}>
                      <Icon name="plus" color="grey"/>
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
                {stacks.map((stack, index) => {
                  return (
                    <Table.Row>
                      <Table.Cell>{stack}</Table.Cell>
                      <Table.Cell><Icon name={"minus"} size={"small"} color={"red"}/></Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Header>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default AboutPane
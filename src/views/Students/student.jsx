import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import faker from 'faker'
import {Grid, Header, Image, Segment, Button, Card, GridColumn, Icon, Menu, List, Label} from "semantic-ui-react";
import './student.css'
import AddEducationModal from "../../components/Modal/AddEducationModal"
import AddProfileModal from "../../components/Modal/AddProfileModal"
const Student = ({ match }) => {
  // let { id } = useParams();

  // just for fun
  const student = ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone_number: faker.phone.phoneNumber(),
    about: faker.lorem.paragraph(),
    image: faker.internet.avatar(),
    cohort: 'Cohort 11',
    spec: 'Foundation'
  })
  // const [student, setStudent] = useState({});

  // useEffect(() => {
  //   const auth_header = localStorage.getItem("access_token");
  //   axios
  //     .get("http://localhost:5000/api/v1/students/" + id, {
  //       headers: { Authorization: `Bearer ${auth_header}` },
  //     })
  //     .then((response) => {
  //       setStudent(response.data.student);
  //     });
  // });

  return (
       <Grid stackable>
         <Grid.Column width={5}>
           <Card fluid>
            <Image src={student.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{student.first_name} {student.last_name}</Card.Header>
              <Card.Meta>
                <span className='date'>{student.spec}</span>
              </Card.Meta>
              <Card.Description>
                {student.about}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {student.cohort}
              </a>
            </Card.Content>
          </Card>
             <Card fluid>
            <Card.Content header='Social link'/>
            <Card.Content>
              <List>
                <List.Item>
                  <List.Icon name='marker' />
                  <List.Content>New York, NY</List.Content>
                </List.Item>
                  <List.Item>
                  <List.Icon name='github' />
                  <List.Content>@KoeusIss</List.Content>
                </List.Item>
                   <List.Item>
                  <List.Icon name='linkedin' />
                  <List.Content>/in/issam-sebri</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='mail' />
                  <List.Content>
                    <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='linkify' />
                  <List.Content>
                    <a href='http://www.semantic-ui.com'>semantic-ui.com</a>
                  </List.Content>
                </List.Item>
              </List>
            </Card.Content>
          </Card>
             <Card fluid>
                 <Card.Content header='Skills'/>
                 <Card.Content>
                     <Label as='a'>
                      Restful API
                         <Icon name='delete' />
                    </Label>
                    <Label as='a'>
                      Web development
                      <Icon name='delete' />
                    </Label>
                     <Label as='a'>
                      Devops and SRE
                      <Icon name='delete' />
                    </Label>
                 </Card.Content>
             </Card>
         </Grid.Column>
          <Grid.Column width={11}>
              <Card fluid>
               <Card.Content header='About me'/>
               <Card.Content>
                 {student.about}
               </Card.Content>
             </Card>
              <Segment fluid>
                  <Menu text fluid>
                    <Menu.Item><Header>Education</Header></Menu.Item>
                    <Menu.Item position='right'>
                        <AddEducationModal theTrigger={
                      <Button icon>
                        <Icon name='plus'></Icon>
                      </Button>
                        }/>
                    </Menu.Item>
                  </Menu>
                <Segment placeholder>
                  <Header icon>
                    <Icon name='book' />
                    No education are listed.
                  </Header>
                    <AddEducationModal theTrigger={ <Button primary>Add Education</Button>}/>
                </Segment>
           </Segment>
            <Segment fluid>
                  <Menu text fluid>
                    <Menu.Item><Header>Experience</Header></Menu.Item>
                    <Menu.Item position='right'>
                      <Button icon>
                        <Icon name='plus'></Icon>
                      </Button>
                    </Menu.Item>
                  </Menu>
                <Segment placeholder>
                  <Header icon>
                    <Icon name='briefcase' />
                    No experience are listed.
                  </Header>
                    <AddProfileModal theTrigger={<Button primary>Add Experience</Button>}/>
                </Segment>
           </Segment>
              <Segment fluid>
                  <Menu text fluid>
                    <Menu.Item><Header>Certificates</Header></Menu.Item>
                    <Menu.Item position='right'>
                        <AddEducationModal theTrigger={
                      <Button icon>
                        <Icon name='plus'></Icon>
                      </Button>
                        }/>
                    </Menu.Item>
                  </Menu>
                <Segment placeholder>
                  <Header icon>
                    <Icon name='certificate' />
                    No education are listed.
                  </Header>
                    <AddEducationModal theTrigger={ <Button primary>Add Certificates</Button>}/>
                </Segment>
           </Segment>
              <Segment fluid>
                  <Menu text fluid>
                    <Menu.Item><Header>Projects</Header></Menu.Item>
                    <Menu.Item position='right'>
                        <AddEducationModal theTrigger={
                      <Button icon>
                        <Icon name='plus'></Icon>
                      </Button>
                        }/>
                    </Menu.Item>
                  </Menu>
                <Segment placeholder>
                  <Header icon>
                    <Icon name='folder open' />
                    No education are listed.
                  </Header>
                    <AddEducationModal theTrigger={ <Button primary>Add Projects</Button>}/>
                </Segment>
           </Segment>
         </Grid.Column>
       </Grid>
  )

};
export default Student;

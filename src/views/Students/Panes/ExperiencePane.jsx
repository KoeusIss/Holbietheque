import {Button, Header, Icon, Menu, Segment, Placeholder, Card} from "semantic-ui-react";
import AddExperienceModal from "../Modal/AddExperienceModal";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UserService from "../../../services/user_service";
import CardPlaceholder from "../../../components/Placeholders/CardPlaceholder";

const ExperiencePane = ({profileId}) => {
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let {id} = useParams();
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    UserService.getStudentExperience(profileId).then(
      (res) => {
        setExperiences(res.data.experiences)
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setError(returnError);
      }
    )
  }, [experiences])

  return (
    <div>
      <Menu text fluid>
        <Menu.Item position='right'>
          <AddExperienceModal
            theTrigger={
              <Button icon basic>
                <Icon name='plus'/>
              </Button>
            }
            student_id={profileId}
          />
        </Menu.Item>
      </Menu>
      {
        experiences.count === 0 ?
        <Segment placeholder>
          <Header icon>
            <Icon name='book'/>
            No experience are listed.
          </Header>
          <AddExperienceModal
            theTrigger={
              <Button primary>
                Add experience
              </Button>
            }
            student_id={profileId}
          />
        </Segment>
        :
        <div>
          {
            experiences.map((exp) => {
              return (
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{exp.title}</Card.Header>
                    <Card.Meta>{exp.company}}</Card.Meta>
                    <Card.Meta>From {exp.start_at} to {exp.end_at}</Card.Meta>
                    <Card.Description>
                      {exp.description}
                    </Card.Description>
                    <Button.Group basic size='small' floated='right'>
                      <Button icon='pencil'/>
                      <Button icon='trash'/>
                    </Button.Group>
                  </Card.Content>
                </Card>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default ExperiencePane
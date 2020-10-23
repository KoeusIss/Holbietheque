import {Button, Header, Icon, Menu, Segment, Placeholder, Card} from "semantic-ui-react";
import AddEducationModal from "../Modal/AddEducationModal";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UserService from "../../../services/user_service";
import CardPlaceholder from "../../../components/Placeholders/CardPlaceholder";

const EducationPane = ({profileId}) => {
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let {id} = useParams();
  const [education, setEducation] = useState([])

  useEffect(() => {
    UserService.getStudentEducation(profileId).then(
      (res) => {
        setEducation(res.data.educations)
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
  }, [education])

  return (
    <div>
      <Menu text fluid>
        <Menu.Item position='right'>
          <AddEducationModal
            theTrigger={
              <Button icon basic>
                <Icon name='plus'/>
              </Button>
            }
            student_id={profileId}
          />
        </Menu.Item>
      </Menu>
      {education.count === 0 ?
        <Segment placeholder>
          <Header icon>
            <Icon name='book'/>
            No education are listed.
          </Header>
          <AddEducationModal
            theTrigger={
              <Button primary>
                Add education
              </Button>
            }
            student_id={profileId}
          />
        </Segment>
        :
        <div>
          {
            education.map((edu) => {
              return (
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{edu.school}</Card.Header>
                    <Card.Meta>{edu.degree}, {edu.major}</Card.Meta>
                    <Card.Meta>From {edu.start_at} to {edu.end_at}</Card.Meta>
                    <Card.Description>
                      {edu.description}
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

export default EducationPane
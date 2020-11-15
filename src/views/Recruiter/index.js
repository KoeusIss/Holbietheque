/**
 * Recruiter profile
 */
import React, {useEffect, useState} from "react";
import AboutPane from "./About";
import EditRecruiter from "./add_edit_recruiter";
import RecruiterService from "../../services/recruiter_service"
import Recruiter from "../../models/Recruiter";
import {useParams} from "react-router-dom";
import {
  Container,
  Segment,
  Tab,
  Header,
  Grid,
  List,
  Icon,
  Button
} from "semantic-ui-react";
import "./recruiter.css"
import JobsPane from "./OpenJob";
import UploadLogo from "./add_logo";

/**
 * Recruiter profile view
 * @returns {JSX.Element}
 * @constructor
 */
const RecruiterProfile = () => {
  const [loading, setLoading] = useState(false)
  const [recruiter, setRecruiter] = useState(new Recruiter())
  let {id} = useParams();
  const owner = recruiter.id === id
  
  useEffect(() => {
    setLoading(true);
    RecruiterService.get(id).then(
      (res) => {
        setLoading(false)
        setRecruiter(res.data.recruiter)
      },
      (error) => {
        setLoading(false);
      }
    );
  }, [recruiter]);
  
  return (
    <Container>
      <Grid columns={2} stackable>
        <Grid.Row style={{paddingTop: "2rem"}}>
          <Grid.Column width={2} textAlign={"center"}>
            <UploadLogo recruiter={recruiter}/>
          </Grid.Column>
          <Grid.Column width={11}>
            <Header as="h2" className="company-header">
              {recruiter.name}
              <Header.Subheader>
                {recruiter.description}
              </Header.Subheader></Header>
            <List horizontal={window.innerWidth > 480} relaxed>
              {recruiter.web_site &&
              <List.Item>
                <List.Content>
                  <List.Header>Web site</List.Header>
                  <List.Description>
                    <a href={recruiter.web_site}>{recruiter.web_site}</a>
                  </List.Description>
                </List.Content>
              </List.Item>
              }
              {recruiter.headquarter &&
              <List.Item>
                <List.Content>
                  <List.Header>Headquarter</List.Header>
                  <List.Description>{recruiter.headquarter}</List.Description>
                </List.Content>
              </List.Item>
              }
              {recruiter.company_size &&
              <List.Item>
                <List.Content>
                  <List.Header>Company size</List.Header>
                  <List.Description>Between {recruiter.company_size} employees</List.Description>
                </List.Content>
              </List.Item>
              }
              {recruiter.founded &&
              <List.Item>
                <List.Content>
                  <List.Header>Founded</List.Header>
                  <List.Description>{recruiter.founded}</List.Description>
                </List.Content>
              </List.Item>
              }
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            {owner &&
            <EditRecruiter
              recruiter={recruiter}
              theTrigger={
                <Button icon basic labelPosition="left" fluid>
                  <Icon name="pencil"/>
                  Edit profile
                </Button>
              }
            />
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment vertical className="panes">
        <Tab menu={{secondary: true, pointing: true}} panes={[
          {
            menuItem: 'About',
            render: () => <AboutPane userID={id} recruiter={recruiter}/>,
          },
          {
            menuItem: 'Jobs',
            render: () => <JobsPane userID={id} recruiter={recruiter}/>,
          }
        ]}/>
      </Segment>
    </Container>
  )
}

export default RecruiterProfile
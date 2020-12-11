/**
 * Recruiter profile
 */
import React, {useEffect, useState} from "react";
import AboutPane from "./About";
import EditRecruiter from "./add_edit_recruiter";
import RecruiterService from "../../services/recruiter_service"
import Recruiter from "../../models/Recruiter";
import {Route, Switch, useParams, useRouteMatch, Link} from "react-router-dom";
import {
  Container,
  Segment,
  Header,
  Grid,
  List,
  Icon,
  Button, Menu
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
  const [activeItem, setActiveItem] = useState('')
  const [recruiter, setRecruiter] = useState(new Recruiter())
  let {id} = useParams();
  const owner = recruiter.id === id
  let {path, url} = useRouteMatch();
  
  
  // load recruiter data
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
  
  // handle middle menu click item
  const handleItemClick = (event, {name}) => {
    setActiveItem(name)
  }
  
  return (
    <>
      <Container>
        <Grid columns={2} stackable>
          <Grid.Row style={{paddingTop: "4rem", paddingBottom: "2rem"}}>
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
      </Container>
      <Menu pointing secondary>
        <Container>
          <Menu.Item
            name='jobs'
            active={activeItem === 'jobs'}
            onClick={handleItemClick}
            as={Link}
            to={`${url}/jobs`}
          />
          <Menu.Item
            name='about'
            active={activeItem === 'about'}
            onClick={handleItemClick}
            as={Link}
            to={`${url}/about`}
          />
          <Menu.Item
            name='core_values'
            active={activeItem === 'core_values'}
            onClick={handleItemClick}
            as={Link}
            to={`${url}/core_values`}
          />
          <Menu.Item
            name='our_mission'
            active={activeItem === 'our_mission'}
            onClick={handleItemClick}
            as={Link}
            to={`${url}/our_mission`}
          />
          <Menu.Item
            name='interview_process'
            active={activeItem === 'interview_process'}
            onClick={handleItemClick}
            as={Link}
            to={`${url}/interview_process`}
          />
        </Container>
      </Menu>
      <Segment vertical>
        <Container>
          <Switch>
            <Route path={`${path}/jobs`}>
              <JobsPane userID={id} recruiter={recruiter}/>
            </Route>
            <Route path={`${path}/:tab`}>
              <AboutPane userID={id} recruiter={recruiter}/>
            </Route>
            <Route path={path} exact>
            </Route>
          </Switch>
        </Container>
      
      </Segment>
    </>
  )
}

export default RecruiterProfile
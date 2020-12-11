/**
 * Jobs recruiter pane
 */
import React, {useEffect, useState} from "react";
import JobService from "../../../services/job_service";
import Job from "./job";
import {Link, Route, useRouteMatch, Switch} from "react-router-dom";
import AddEditJob from "./add_edit_job";
import image from "../../../images/image.png"
import {
  Segment,
  Header,
  Grid,
  Menu,
  Image,
  List,
  Button,
  Icon, Card, Label
} from "semantic-ui-react";

/**
 * jobs pane
 * @param {string} userID
 * @param {object} recruiter
 * @returns {JSX.Element}
 * @constructor
 */
const JobsPane = ({userID, recruiter}) => {
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState([])
  const owner = userID === recruiter.id
  
  // Loads the list of jobs for the current recruiter
  useEffect(() => {
    setLoading(true);
    JobService.getJobsByRecruiter(recruiter.id).then(
      (response) => {
        setJobs(response.data.jobs);
      },
      (error) => {
        setLoading(false);
      }
    );
  }, [jobs]);
  
  // get the actual path and the matched url
  let {path, url} = useRouteMatch();
  
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Menu text fluid style={{marginTop: "0"}}>
            <Menu.Item position="left">
              {/* Create new job trigger */}
              {owner &&
              <AddEditJob
                recruiter={recruiter}
                theTrigger={
                  <Button icon basic labelPosition="right">
                    <Icon name="plus"/>
                    Add new job
                  </Button>
                }
              />}
            </Menu.Item>
          </Menu>
          <Grid.Column width={"sixteen"}>
            <Segment>
              {/*<List relaxed='very' divided>*/}
              {/*{jobs.map((job, index) => {*/}
              {/*  return (*/}
              {/*      <Card fluid>*/}
              {/*        <Card.Content>*/}
              {/*          <Image*/}
              {/*            floated='left'*/}
              {/*            size='mini'*/}
              {/*            src={image}*/}
              {/*          />*/}
              {/*          <Card.Header content={job.title} as={Link} to={`${url}/${job.id}`}/>*/}
              {/*          <Card.Meta content={job.recruiter.name}/>*/}
              {/*          <Card.Meta content={job.location}/>*/}
              {/*          <Card.Description>*/}
              {/*            <List>*/}
              {/*              <List.Item icon='keyboard outline' content={job.level}/>*/}
              {/*              <List.Item icon='money bill alternate outline' content={job.salary}/>*/}
              {/*            </List>*/}
              {/*          </Card.Description>*/}
              {/*        </Card.Content>*/}
              {/*        <Card.Content extra>*/}
              {/*          <Icon name="time"/>*/}
              {/*          3 days ago*/}
              {/*        </Card.Content>*/}
              {/*      </Card>*/}
              <Grid>
                <Grid.Row style={{height: "160px"}}>
                  <Grid.Column width={2}>
                    <Image
                      size='tiny'
                      src={image}
                      style={{margin: "auto"}}
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Header as={"h4"} style={{color: "#4c4b53"}}>
                      Software engineer
                      <Header.Subheader>By <a>Holberton school</a> | Created 2 days ago</Header.Subheader>
                    </Header>
                    <p>
                      Define Your Future & become a Software Engineer. No repayment until you find a job. Come learn
                      what we're doing.
                    </p>
                    <Label.Group>
                      <Label>Python</Label>
                      <Label>AWS</Label>
                      <Label>HTML/Css</Label>
                      <Label>Django</Label>
                      <Label>React</Label>
                    </Label.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {/*  )*/}
              {/*})}*/}
              {/*</List>*/}
            </Segment>
          </Grid.Column>
          
          {/*<Grid.Column width={10}>*/}
          {/*  <Switch>*/}
          {/*    <Route path={`${path}/:jobId`}>*/}
          {/*      <Job recruiter={recruiter}/>*/}
          {/*    </Route>*/}
          {/*    <Route path={path} exact>*/}
          {/*      <Segment placeholder textAlign={"center"}>*/}
          {/*        <Header as='h4' icon>*/}
          {/*          <Icon name='paperclip' color="grey"/>*/}
          {/*          Select a job to see details*/}
          {/*        </Header>*/}
          {/*      </Segment>*/}
          {/*    </Route>*/}
          {/*  </Switch>*/}
          {/*</Grid.Column>*/}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default JobsPane
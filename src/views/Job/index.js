/**
 * Jobs list view
 */
import React, {useEffect, useState} from 'react'
import JobService from "../../services/job_service";
import image from "../../images/image.png";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import JobItem from "./job";
import {
  Segment,
  Container,
  Form,
  Grid,
  List,
  Image,
  Header,
  Icon,
  Card,
  Button
} from "semantic-ui-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  let {path, url} = useRouteMatch()
  
  useEffect(() => {
    setLoading(true);
    JobService.jobs().then(
      (response) => {
        setJobs(response.data.jobs);
        console.log(response.data.jobs[0].created_at, Date.now().toString())
      },
      (error) => {
        setLoading(false);
      }
    );
  }, []);
  
  return (
    <Container>
      {/* Search form */}
      <Segment style={{marginTop: "2em"}} attached>
        <Form>
          <Form.Group widths={"equal"}>
            <Form.Input
              icon='search'
              placeholder='Search...'
              label="What?"
            />
            <Form.Input
              icon='marker'
              placeholder='Location'
              label="Where?"
            />
          </Form.Group>
          <Form.Button basic color="green">Search</Form.Button>
        </Form>
      </Segment>
      {/* Job list */}
      <Grid>
        <Grid.Row style={{marginTop: "2em"}}>
          <Grid.Column width={6}>
            <Segment>
              {jobs.map((job, index) =>
                <Card fluid>
                  <Card.Content>
                    <Image
                      floated='left'
                      size='mini'
                      src={image}
                    />
                    <Card.Header content={job.title} as={Link} to={`${url}/${job.id}`}/>
                    <Card.Meta content={job.recruiter.name}/>
                    <Card.Meta content={job.location}/>
                    <Card.Description>
                      <List>
                        <List.Item icon='keyboard outline' content={job.level}/>
                        <List.Item icon='money bill alternate outline' content={job.salary}/>
                      </List>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="time"/>
                    3 days ago
                  </Card.Content>
                </Card>
              )}
            </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Switch>
              <Route path={`${path}/:jobId`}>
                <JobItem/>
              </Route>
              <Route path={path} exact>
                <Segment placeholder>
                  <Header icon>
                    <Icon name='pdf file outline'/>
                    You think about building your resume?
                  </Header>
                  <Button primary as={Link} to={"/login"}>Build your resume</Button>
                </Segment>
              </Route>
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Jobs
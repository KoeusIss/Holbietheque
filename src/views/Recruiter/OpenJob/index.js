import React, {useEffect, useState} from "react";
import {Segment, Header, Grid, Menu, Image, List, Button, Icon, Divider, Label} from "semantic-ui-react";
import JobService from "../../../services/job_service";
import Job from "./job";
import {Link, Route, useRouteMatch, Switch} from "react-router-dom";
import AddEditJob from "./add_edit_job";
import image from "../../../images/image.png"

const JobsPane = ({userID, recruiter}) => {
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState([])
  const owner = userID === recruiter.id
  
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
  
  let {path, url} = useRouteMatch();
  
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Menu text fluid style={{marginTop: "0"}}>
            <Menu.Item position="left">
              {owner &&
              <AddEditJob
                recruiter={recruiter}
                theTrigger={
                  <Button icon basic labelPosition="right">
                    <Icon name="plus"/>
                    Add new job
                  </Button>
                }
              />
              }
            </Menu.Item>
          </Menu>
          <Grid.Column width={6}>
            <Segment>
              <List relaxed='very' divided>
                {jobs.map((job, index) => {
                  return (
                    <List.Item>
                      <Image size="mini" src={image}/>
                      <List.Content>
                        <List.Header as={Link} to={`${url}/${job.id}`}>{job.title}</List.Header>
                        <List.Description>
                          {job.location}
                        </List.Description>
                        <List.Description style={{marginTop: "6px"}}>
                          {job.salary}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  )
                })}
              </List>
            </Segment>
          </Grid.Column>
          
          <Grid.Column width={10}>
            <Switch>
              <Route path={`${path}/:jobId`}>
                <Job recruiter={recruiter}/>
              </Route>
              <Route path={path} exact>
                <Segment placeholder textAlign={"center"}>
                  <Header as='h4' icon>
                    <Icon name='paperclip' color="grey"/>
                    Select a job to see details
                  </Header>
                </Segment>
              </Route>
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default JobsPane
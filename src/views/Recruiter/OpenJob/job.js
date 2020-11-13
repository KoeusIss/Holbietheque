import React, {useEffect, useState} from 'react'
import {Button, Divider, Grid, Header, Icon, Image, Label, List, Menu, Segment} from "semantic-ui-react";
import {useParams} from "react-router";
import JobService from "../../../services/job_service";
import AddEditJob from "./add_edit_job";

const company_img = "https://i.stack.imgur.com/NC3AA.png"

const Job = ({recruiter}) => {
  let {jobId} = useParams();
  const [job, setJob] = useState({})
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true);
    JobService.job(jobId).then(
      (response) => {
        setJob(response.data.job);
      },
      (error) => {
        const returnError =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
      }
    );
  }, [job]);
  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={company_img}/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as='h2' style={{marginTop: "8px"}}>
              {job.title}
              <Header.Subheader>
                {job.location}
              </Header.Subheader>
            </Header>
            <List horizontal={window.innerWidth > 600} relaxed>
              <List.Item>
                <List.Content>
                  <List.Header>Salary</List.Header>
                  <List.Description>{job.salary}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Level</List.Header>
                  <List.Description>{job.level}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Type</List.Header>
                  <List.Description>{job.type}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Menu text style={{marginTop: "0", marginBottom: "0"}}>
              <Menu.Menu position="right">
                <AddEditJob
                recruiter={recruiter}
                theTrigger={<Button basic icon><Icon name="pencil"/></Button>}
                job={job}
              />
                <Button basic icon><Icon name="trash"/></Button>
              </Menu.Menu>
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row>
          <Grid.Column>
            <Header as={'h3'}>Job summary</Header>
            <p>{job.summary}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as={'h3'}>Job Description</Header>
            <p>{job.description}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default Job
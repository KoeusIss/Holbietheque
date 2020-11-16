/**
 * Job item
 */
import React, {useEffect, useState} from 'react'
import {Button, Divider, Grid, Header, Icon, Image, Label, List, Menu, Segment} from "semantic-ui-react";
import {useParams} from "react-router";
import JobService from "../../services/job_service"
import MDEditor from "@uiw/react-md-editor";
import image from "../../images/image.png"


const JobItem = () => {
  const [job, setJob] = useState({})
  const [loading, setLoading] = useState(false)
  let {jobId} = useParams();
  
  // Loading job based on route id
  useEffect(() => {
    setLoading(true);
    JobService.job(jobId).then(
      (response) => {
        setJob(response.data.job);
        setLoading(false)
      },
      (error) => {
        setLoading(false);
      }
    );
  }, [job]);
  
  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={image}/>
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
          <Grid.Column>
            <Button basic >Apply</Button>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row>
          <Grid.Column>
            <MDEditor.Markdown source={job.description}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default JobItem
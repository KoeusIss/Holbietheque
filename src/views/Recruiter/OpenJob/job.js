/**
 * Create job component
 */
import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import JobService from "../../../services/job_service";
import AddEditJob from "./add_edit_job";
import MDEditor from "@uiw/react-md-editor";
import DeleteModal from "./delete";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import image from "../../../images/image.png"

/**
 *
 * @param recruiter
 * @returns {JSX.Element}
 * @constructor
 */
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
          <Grid.Column width={3}>
            <Menu text style={{marginTop: "0", marginBottom: "0"}}>
              <Menu.Menu position="right">
                <AddEditJob
                  recruiter={recruiter}
                  theTrigger={<Button basic icon><Icon name="pencil"/></Button>}
                  job={job}
                />
                <DeleteModal
                  job={job}
                  theTrigger={<Button basic icon><Icon name="trash"/></Button>}
                />
              </Menu.Menu>
            </Menu>
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

export default Job
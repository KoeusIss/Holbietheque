import React, {useEffect, useState} from "react";
import {Container, Segment, Tab, Image, Header, Grid, List, Icon, Button} from "semantic-ui-react";
import "./recruiter.css"
import AboutPane from "./About";
import OpenPane from "./OpenJob";
import RecruiterService from "../../services/recruiter_service"
import Recruiter from "../../models/Recruiter";
import {toaster} from "evergreen-ui";
import {useParams} from "react-router-dom";


const RecruiterProfile = () => {
  const [loading, setLoading] = useState(false)
  const [recruiter, setRecruiter] = useState(new Recruiter())
  let { id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    RecruiterService.get(id).then(
      (res) => {
        setRecruiter(res.data.recruiter);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toaster.danger(message)
      }
    );
  }, [recruiter]);

  return (
    <Container>
      <Grid columns={2}>
        <Grid.Row style={{paddingTop: "2rem"}}>
          <Grid.Column width={2}>
            <Image src={"https://i.stack.imgur.com/NC3AA.png"} style={{width: "150px"}}/>
          </Grid.Column>
          <Grid.Column width={11}>
            <Header style={{marginTop: "5px"}} as="h2">
              {recruiter.name}
              <Header.Subheader>
                {recruiter.description}
              </Header.Subheader></Header>
            <List horizontal relaxed>
              <List.Item>
                <List.Content>
                  <List.Header>Web site</List.Header>
                  <List.Description>{recruiter.web_site}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Headquarter</List.Header>
                  <List.Description>{recruiter.headquarter}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Company size</List.Header>
                  <List.Description>Between {recruiter.company_size} employees</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Founded</List.Header>
                  <List.Description>{recruiter.founded}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          
          </Grid.Column>
          <Grid.Column width={3}>
            <Button icon basic labelPosition="left">
                  <Icon name="pencil"/>
                  Edit profile
                </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment vertical className="panes">
        <Tab menu={{secondary: true, pointing: true}} panes={[
          {
            menuItem: 'About',
            render: () => <AboutPane/>,
          },
          {
            menuItem: 'Open job',
            render: () => <OpenPane/>,
          }
        ]}/>
      </Segment>
    
    </Container>
  )
}

export default RecruiterProfile
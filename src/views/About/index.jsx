/**
 * About views
 */
import React from "react"
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Card,
} from "semantic-ui-react";
import './about.css'

/**
 * About heading
 * @returns {JSX.Element}
 * @constructor
 */

const AboutHeading = () => (
  <Segment vertical className={"heading"}>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column floated="right" width={6}>
          <Image
            bordered
            rounded
            size="large"
            src={require("../../images/holberton.jpeg")}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h3" className="about-heading">
            Who is Holberton?
          </Header>
          <p className="about-heading">
            Frances Elizabeth Snyder Holberton (1917-2001), nicknamed Betty, was
            one of six programmers at ENIAC, the first fully electronic computer
            created by the US military in 1943. Betty Holberton played a major
            role in what has become today's computing. She also participated in
            the creation and design of the FORTRAN and COBOL programming
            languages. His daughters, Priscilla Holberton and Pamela Holberton,
            are thrilled that their mother's work is recognized and that it
            inspires a new generation of men and women in the IT field.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);


const About = () => (
  <div>
    <AboutHeading/>
    <Segment vertical>
      <Container>
        <Header as='h2' icon textAlign='center'>
          <Icon name='id card outline' color={'grey'}/>
          <Header.Content>Project creators and builders</Header.Content>
        </Header>
        <Divider hidden style={{marginBottom: "5em"}}/>
        <Grid stackable verticalAlign="middle" columns={3} >
          <Grid.Row>
            <Grid.Column>
              <Card
                fluid
                image='https://media-exp1.licdn.com/dms/image/C4E03AQGE3NyP9rHR6g/profile-displayphoto-shrink_800_800/0?e=1609372800&v=beta&t=yY-bJpcAyJCihoh-4obkW0B1oW7DbAH2InXgYK67JiU'
                header='Iheb Chatti'
                meta="Full stack web developer"
                description='Iheb is the responsible for backend and DevOps technologies including deployment, and server maitenance'
                extra={<a href="http://github.com/IhebChatti"><Icon name='github'/>IhebChatti</a>}
              />
            </Grid.Column>
            <Grid.Column>
              <Card
                fluid
                image='https://media-exp1.licdn.com/dms/image/C5603AQFbU1EE3H1g4Q/profile-displayphoto-shrink_800_800/0?e=1609372800&v=beta&t=9WKRP32BzpUdOCAz3Ml0aGSQzrJjk3VPTB4GZxFCAP4'
                header='Foued Dadi'
                meta="Full stack web developer"
                description='Foued Dadi is the designer of the project and front end builder with using Recat Js, CSS and HTML'
                extra={<a href="http://github.com/FouedDadi"><Icon name='github'/>FouedDadi</a>}
              />
            </Grid.Column>
            <Grid.Column>
              <Card
                fluid
                image='https://media-exp1.licdn.com/dms/image/C4E03AQFecUE73q39Xg/profile-displayphoto-shrink_800_800/0?e=1609372800&v=beta&t=-SeUrBu1PU8Eu1kHPrY0-a6u-pwQbKzY8dUdZKGZFAM'
                header='Issam Sebri'
                meta="Full stack web developer"
                description='Sebri Issam is the responsible of the back end building and API'
                extra={<a href="http://github.com/KoeusIss"><Icon name='github'/>KoeusIss</a>}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      
      </Container>
    </Segment>
    
    <Segment style={{padding: "8em 0em"}} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{fontSize: "2em", color: "#000"}}>
              Our mission
            </Header>
            <p style={{fontSize: "1.33em", color: "#000"}}>
              The tech industry is the fastest growing in history. At Holberton
              School, our mission is to empower motivated and talented people to
              lead the careers they dream of, regardless of their background,
              age, background or financial capacity. We also believe that
              diversity and inclusion are essential for innovation. More
              perspectives, life experiences and cultures promote problem
              solving and idea generation by being more community oriented. We
              believe that IT can only create solutions for everyone if all
              points of view are heard and respected. In our view, tuition fees
              should not be a barrier for those who wish to benefit from a
              quality education. We are ready to invest in your studies,
              allowing you to pay tuition fees through a revenue sharing
              agreement: you pay no upfront tuition fees and pay back the school
              once you get a job.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src={require("../../images/holbertonimg.png")}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
    </Segment>
  </div>
);

export default About;

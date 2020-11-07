import React from "react";
import {Segment, Header, List, Grid, Menu, Dropdown, Button, Icon} from "semantic-ui-react";
import AddAddress from "../../Student/Profile/add_address_modal";
import AddSocialLinks from "../../Student/Profile/add_social_links";
import AddLanguage from "../../Student/Profile/add_language";
import AddSkill from "../../Student/Profile/add_skill";

const company = {
  "about": "Amazon is guided by four principles: customer obsession rather " +
    "than competitor focus, passion for invention, commitment to operational " +
    "excellence, and long-term thinking. We are driven by the excitement of " +
    "building technologies, inventing products, and providing services that " +
    "change lives. We embrace new ways of doing things, make decisions quickly, " +
    "and are not afraid to fail. We have the scope and capabilities of a large" +
    " company, and the spirit and heart of a small one." +
    "Together, Amazonians research and develop new technologies from Amazon Web " +
    "Services to Alexa on behalf of our customers: shoppers, sellers, content " +
    "creators, and developers around the world. Our mission is to be Earth's most " +
    "customer-centric company. Our actions, goals, projects, programs, and inventions " +
    "begin and end with the customer top of mind. You'll also hear us say that at Amazon," +
    " it's always Day 1.​ What do we mean? That our approach remains the same as it" +
    "was on Amazon's very first day - to make smart, fast decisions, stay nimble, invent, " +
    "and focus on delighting our customers.",
  "our_mission": "Our mission: To be Earth's most customer-centric company.\n" +
    "What unites Amazonians across teams and geographies is that we are all striving to  " +
    "delight our customers and make their lives easier.  The scope and scale of our mission" +
    " drives us to seek diverse perspectives, be resourceful, and navigate through ambiguity." +
    "  Inventing and delivering things that were never thought possible isn't easy, " +
    "but we embrace this challenge every day. By working together on behalf of our customers," +
    " we are building the future one innovative product, service, and idea at a time. " +
    " Are you ready to embrace the challenge? Come build the future with us.",
  "core_values": "It’s Always Day 1 \n" +
    "\n" +
    "At Amazon, it’s always “Day 1.” Now, what does this mean and why does it matter?  " +
    "It means that our approach remains the same as it was on Amazon's very first day: " +
    "We embrace new ways of doing things, strive to stay nimble, make decisions quickly," +
    " and always focus on delighting our customers.   We have the scope and capabilities" +
    " of a large company, and the spirit and heart of a small one.\n" +
    "\n" +
    "In his 2016 letter to shareholders, CEO Jeff Bezos shared his thoughts on how to" +
    " maintain a Day 1 mindset.  Read the full letter here.   \n" +
    "\n" +
    "Our Leadership Principles \n" +
    "\n" +
    "Our Leadership Principles help us keep a Day 1 mentality. They aren’t just a pretty " +
    "inspirational wall hanging. Amazonians use them every day, whether they’re discussing " +
    "ideas for new projects, deciding on the best solution for a customer’s problem, " +
    "or interviewing candidates.  Explore all of our Leadership Principles here. \n" +
    "\n" +
    "Diversity and Inclusion \n" +
    "\n" +
    "We value individual expression, respect different opinions, and work together to " +
    "create a culture where each of us is able to contribute fully.  Our unique backgrounds " +
    "and perspectives strengthen our ability to achieve Amazon's mission of being Earth's most customer-centric company.\n" +
    "\n" +
    "Our Affinity Groups bring employees together across businesses and geographies. " +
    "With executive and company sponsorship, these groups play an important role" +
    " in building internal networks for career development, advising Amazon business " +
    "units, leading in service projects, participating in policy discussions, a" +
    "nd reaching out to communities where Amazonians live and work. Since 2016, " +
    "enrollment in Amazon’s affinity groups has more than doubled in more than 90 chapters worldwide.    \n" +
    "\n" +
    "Visit our Diversity & Inclusion page to learn more.  ",
  "office_location": ["Seatle, WA", "Cairo, Egypt", "Riyadh, Saudi Arabia", "Amman, Jordan", "Dubai, United Arab Emirates", "Dublin, Ireland"],
  "benefits": [
    "Medical, dental, and vision plans",
    "401(k) savings plan with company match",
    "Company-paid basic life and accident coverage"
  ],
  "stacks": [
    "DevOps",
    "Web development",
    "Machine learning",
    "Internet of things",
    "Data science"
  ],
  "interview_process": "Our application and interview process differs from role to role, but the main ways we get to know you are through your online application, phone interviews, and in-person interviews.  To check out a comprehensive list of interview preparation tips, visit our Interview Preparation pages on Amazon.jobs.  \n" +
    "\n" +
    "Key information and tips:\n" +
    "\n" +
    "    Our interview process is rooted in our Leadership Principles.  These Principles define our culture and outline the behaviors that are key to thriving at Amazon.\n" +
    "    We use behavioral-based interviewing, which is based on discovering how you think and behave in various employment-related situations.  This interview approach helps us better understand how you solve problems, challenge conventional thinking, and keep projects moving forward.\n" +
    "    The STAR method is a structured way of responding to behavioral-based interview questions that includes discussing the specific situation, task, action, and result.  We recommend leveraging this format in your answers.\n" +
    "    Amazon is a data and metrics-driven company.  When you answer questions, we recommend using metrics or data if applicable.  \n" +
    "\n" +
    "Search and apply to open roles on amazon.jobs.    "
}
const AboutPane = () => {
  return (
    <div>
      
      <Grid>
        
        <Grid.Row>
          <Grid.Column width={12}>
            <Menu text fluid style={{marginTop: "0"}}>
              <Menu.Item position="right">
                <Dropdown
                  button
                  basic
                  link
                  className="icon"
                  floating
                  labeled
                  icon="plus"
                  text="Add to profile"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item text="Overview"/>
                    <Dropdown.Item text="Our mission"/>
                    <Dropdown.Item text="Core values"/>
                    <Dropdown.Item text="Interview process"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Menu>
            <Segment>
              <Header>About the company</Header>
              <p>{company.about}</p>
              <Menu text style={{marginTop: "0", marginBottom: "0"}}>
                <Menu.Menu position="right">
                    <Button basic icon><Icon name="pencil"/></Button>
                    <Button basic icon><Icon name="trash"/></Button>
                </Menu.Menu>
              
              </Menu>
            </Segment>
            <Segment>
              <Header>Our mission</Header>
              <p>{company.our_mission}</p>
            </Segment>
            <Segment>
              <Header>Core values</Header>
              <p>{company.core_values}</p>
            </Segment>
            <Segment>
              <Header>Interview process</Header>
              <p>{company.interview_process}</p>
            </Segment>
          
          </Grid.Column>
          <Grid.Column width={4}>
            <Menu vertical fluid>
              <Menu.Item>
                <Header as='h4'>Stacks</Header>
                {company.stacks.map((stack, index) => {
                  return (
                    <p key={index}>{stack}</p>
                  )
                })}
              </Menu.Item>
              <Menu.Item>
                <Header as='h4'>Office locations</Header>
                {company.office_location.map((location, index) => {
                  return (
                    <p key={index}>{location}</p>
                  )
                })}
              </Menu.Item>
              <Menu.Item>
                <Header as='h4'>Company benefits</Header>
                {company.benefits.map((benefit, index) => {
                  return (
                    <p key={index}>{benefit}</p>
                  )
                })}
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    
    </div>
  
  )
}

export default AboutPane
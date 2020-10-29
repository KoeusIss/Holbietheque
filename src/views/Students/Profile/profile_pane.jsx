import {
  Button,
  Header,
  Icon,
  Menu,
  Divider,
  Segment,
  Dropdown,
  Card,
} from "semantic-ui-react";
import Add_profile from "./add_profile";
import React, { useEffect } from "react";
import AddSocialLinks from "./add_social_links";
import EditExperience from "../Experiences/edit_experience";
import AddAddress from "./add_address_modal";
import AddAboutMe from "./add_about_me";
import AddLanguage from "./add_language";
import AddSkill from "./add_skill";

const ProfilePane = ({ student, languages, skills, socialLink, owner }) => {
  return (
    <div
      style={{
        top: "2rem",
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
      }}
    >
      <Menu text fluid>
        {owner() && (
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
                <AddAddress
                  theTrigger={<Dropdown.Item text="Location" />}
                  student_id={student.id}
                />
                <AddSocialLinks
                  theTrigger={<Dropdown.Item text="Social links" />}
                  student_id={student.id}
                  socialLink={socialLink}
                />
                <AddLanguage
                  theTrigger={<Dropdown.Item text="Languages" />}
                  student_id={student.id}
                  languages={languages}
                />
                <AddSkill
                  theTrigger={<Dropdown.Item text="Skills" />}
                  student_id={student.id}
                  languages={skills}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Menu>
      <Card fluid>
        <Card.Content>
          <Card.Header>About me</Card.Header>
          <Card.Description>
            <p>{student.about_me}</p>
          </Card.Description>
        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content>
          <Card.Header>Languages</Card.Header>
          <Card.Description>
            {languages.map((language) => (
              <div>{language.name}</div>
            ))}
          </Card.Description>
        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content>
          <Card.Header>Skills</Card.Header>
          <Card.Description>
            {skills.map((skill) => (
              <div>{skill.name}</div>
            ))}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfilePane;

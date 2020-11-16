/**
 * Profile pane
 */
import {
  Menu,
  Dropdown,
  Card,
} from "semantic-ui-react";
import React from "react";
import CreateEditSocialLinks from "./CreateEditSocialLinks";
import AddAddress from "./add_address_modal";
import AddLanguage from "./add_language";
import AddSkill from "./add_skill";

const ProfilePane = ({student, languages, skills, socialLinks, owner}) => {
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
                  theTrigger={<Dropdown.Item text="Location"/>}
                  student_id={student.id}
                />
                <CreateEditSocialLinks
                  theTrigger={<Dropdown.Item text="Social links"/>}
                  student_id={student.id}
                  socials={socialLinks}
                />
                <AddLanguage
                  theTrigger={<Dropdown.Item text="Languages"/>}
                  student_id={student.id}
                />
                <AddSkill
                  theTrigger={<Dropdown.Item text="Skills"/>}
                  student_id={student.id}
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
      {student.language ? (
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
      ) : null}
      {student.skill ? (
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
      ) : null}
    </div>
  );
};

export default ProfilePane;

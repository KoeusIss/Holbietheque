import {Button, Header, Icon, Menu, Segment, Dropdown, Card} from "semantic-ui-react";
import Add_profile from "./add_profile";
import React, {useEffect} from "react";
import AddSocialLinks from "./add_social_links";
import EditExperience from "../Experiences/edit_experience";
import AddAddress from "./add_address_modal";
import AddAboutMe from "./add_about_me";

const handleClick = () => {
  console.log('item clicked')
}

const ProfilePane = ({profileId}) => {
  return (
    <div>
      <Menu text fluid>
        <Menu.Item position='right'>
          <Dropdown
            button basic link
            className='icon'
            floating
            labeled
            icon='plus'
            text='Add to profile'
            onClick={handleClick}
          >
            <Dropdown.Menu>
              {/*<AddAboutMe*/}
              {/*  theTrigger={<Dropdown.Item text="Overview"/>}*/}
              {/*  student_id={profileId}*/}
              {/*/>*/}
              {/*<AddAddress*/}
              {/*  theTrigger={<Dropdown.Item text="Location"/>}*/}
              {/*  student_id={profileId}*/}
              {/*/>*/}
              {/*<AddSocialLinks*/}
              {/*  theTrigger={<Dropdown.Item text="Social links"/>}*/}
              {/*  student_id={profileId}*/}
              {/*/>*/}
              {/*<Dropdown.Item text="Skills"/>*/}
              {/*<Dropdown.Item text="Language"/>*/}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
      {profileId ?
        <Segment placeholder>
          <Header icon>
            <Icon name='user'/>
            No personal information available.
          </Header>
          <Add_profile
            theTrigger={
              <Button primary>
                Edit Profile
              </Button>
            }
          />
        </Segment>
        :
        <Card fluid>
          <Card.Content>
            <Card.Header>About me</Card.Header>
            <Card.Description>
              <p>
                One morning, when Gregor Samsa woke from troubled dreams,
                he found himself transformed in his bed into a horrible vermin.
                He lay on his armour-like back, and if he lifted his head a
                little he could see his brown belly, slightly domed and
                divided by arches into stiff sections. The bedding was
                hardly able to cover it and seemed ready to slide off any
                moment. His many legs, pitifully thin compared with the
                size of the rest of him, waved about helplessly as
                he looked. "What's happened to me?" he thoe
              </p>
            </Card.Description>
            <Button.Group basic size='small' floated='right'>
              <Button icon='trash'/>
            </Button.Group>
          </Card.Content>
        </Card>
      }
    </div>
  )
}

export default ProfilePane
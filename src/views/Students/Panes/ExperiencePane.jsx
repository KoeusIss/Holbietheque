import {Button, Header, Icon, Menu, Segment} from "semantic-ui-react";
import AddProfileModal from "../Modal/AddProfileModal";
import React, {useEffect} from "react";


const ExperiencePane = () => {
    return (
        <div>
            <Menu text fluid>
                <Menu.Item position='right'>
                    <AddProfileModal
                        theTrigger={
                            <Button icon>
                                <Icon name='add'/>
                            </Button>
                        }
                    />
                </Menu.Item>
            </Menu>
            <Segment placeholder>
                <Header icon>
                    <Icon name='briefcase'/>
                    No experience are listed.
                </Header>
                <AddProfileModal
                    theTrigger={
                        <Button primary>
                            Add experience
                        </Button>
                    }
                />
            </Segment>
        </div>
    )
}

export default ExperiencePane
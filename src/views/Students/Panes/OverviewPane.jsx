import {Button, Header, Icon, Menu, Segment} from "semantic-ui-react";
import AddProfileModal from "../Modal/AddProfileModal";
import React, {useEffect} from "react";


const OverviewPane = () => {
    return (
        <div>
            <Menu text fluid>
                <Menu.Item position='right'>
                    <AddProfileModal
                        theTrigger={
                            <Button icon>
                                <Icon name='pencil'/>
                            </Button>
                        }
                    />
                </Menu.Item>
            </Menu>
            <Segment placeholder>
                <Header icon>
                    <Icon name='user'/>
                    No education are listed.
                </Header>
                <AddProfileModal
                    theTrigger={
                        <Button primary>
                            Add Profile
                        </Button>
                    }
                />
            </Segment>
        </div>
    )
}

export default OverviewPane
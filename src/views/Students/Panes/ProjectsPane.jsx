import {Button, Header, Icon, Menu, Segment} from "semantic-ui-react";
import AddEducationModal from "../Modal/AddProjectModal";
import React, {useEffect} from "react";


const ProjectsPane = () => {
    return (
        <div>
            <Menu text fluid>
                <Menu.Item position='right'>
                    <AddEducationModal
                        theTrigger={
                            <Button icon>
                                <Icon name='plus'/>
                            </Button>
                        }
                    />
                </Menu.Item>
            </Menu>
            <Segment placeholder>
                <Header icon>
                    <Icon name='book'/>
                    No projects are listed.
                </Header>
                <AddEducationModal
                    theTrigger={
                        <Button primary>
                            Add projects
                        </Button>
                    }
                />
            </Segment>
        </div>
    )
}

export default ProjectsPane
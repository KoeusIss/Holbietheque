import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import faker from 'faker'
import {
    Grid,
    Header,
    Image,
    Segment,
    Button,
    Card,
    GridColumn,
    Icon,
    Menu,
    List,
    Label,
    Tab,
    ButtonGroup
} from "semantic-ui-react";
import './student.css'
import OverviewPane from "./Panes/OverviewPane";
import EducationPane from "./Panes/EducationPane";
import ExperiencePane from "./Panes/ExperiencePane";
import ProjectsPane from "./Panes/ProjectsPane";
import CertificatesPane from "./Panes/CertificatesPane";
import UserService from '../../services/user_service'
import {toaster} from "evergreen-ui";
import AddEducationModal from "./Modal/AddProjectModal";

const Student = ({match}) => {
    const [loginError, setError] = useState("");
    const [loading, setLoading] = useState(false);
    let {id} = useParams();
    const [student, setStudent] = useState(null)

    useEffect(() => {
        UserService.getStudentByUser(id).then(
            (res) => {
                setStudent(res.data.student)
            },
            (error) => {
                const returnError =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setError(returnError);
            }
        )
    }, [])

    return (
        <div>
            {
                student ?
                    <Grid stackable>
                        <Grid.Column width={5}>
                            <Card fluid>
                                <Image src={student.image} wrapped ui={false}/>
                                <Card.Content>
                                    <Card.Header>{student.full_name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{student.last_name}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        <Card.Content>
                                            <List>
                                                <List.Item>
                                                    <List.Icon name='marker'/>
                                                    <List.Content>New York, NY</List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Icon name='github'/>
                                                    <List.Content>@KoeusIss</List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Icon name='linkedin'/>
                                                    <List.Content>/in/issam-sebri</List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Icon name='mail'/>
                                                    <List.Content>
                                                        <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Icon name='linkify'/>
                                                    <List.Content>
                                                        <a href='http://www.semantic-ui.com'>semantic-ui.com</a>
                                                    </List.Content>
                                                </List.Item>
                                            </List>
                                        </Card.Content>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='user'/>
                                        {student.cohort}
                                    </a>
                                </Card.Content>
                            </Card>
                            <Card fluid>
                                <Card.Content header='Skills'/>
                                <Card.Content>
                                    <Label as='a'>
                                        Restful API
                                        <Icon name='delete'/>
                                    </Label>
                                    <Label as='a'>
                                        Web development
                                        <Icon name='delete'/>
                                    </Label>
                                    <Label as='a'>
                                        Devops and SRE
                                        <Icon name='delete'/>
                                    </Label>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Tab menu={{attached: false}} panes={[
                                {
                                    menuItem: 'Overview',
                                    render: () => <OverviewPane/>
                                },
                                {
                                    menuItem: 'Education',
                                    render: () => <EducationPane/>
                                },
                                {
                                    menuItem: 'Experience',
                                    render: () => <ExperiencePane/>
                                },
                                {
                                    menuItem: 'Certificates',
                                    render: () => <CertificatesPane/>
                                },
                                {
                                    menuItem: 'Projects',
                                    render: () => <ProjectsPane/>
                                }
                            ]}/>
                        </Grid.Column>
                    </Grid>
                    :
                    <Segment vertical textAlign="center">
                        <Image src={require('../../images/empty_img.png')} size="large" style={{margin: "auto"}}/>
                        <AddEducationModal
                            theTrigger={
                                <Button primary>
                                    Add profile
                                </Button>
                            }
                        />
                    </Segment>
            }
        </div>
    )

};

export default Student;
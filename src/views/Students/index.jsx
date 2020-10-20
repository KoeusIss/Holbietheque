import React, { useEffect, useState } from "react";
import axios from "axios";
import {NavLink} from 'react-router-dom'
import { Button, Card, Image, Header } from 'semantic-ui-react'

const Students = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const auth_header = localStorage.getItem("access_token");
    axios
      .get("http://localhost:5000/api/v1/students", {
        headers: { Authorization: `Bearer ${auth_header}` },
      })
      .then((response) => {
        setStudents(response.data.students);
      });
  });
  return (
      <div>
      <Header as='h2' icon='student' content='Student list' />
    <Card.Group>
      {
        students.map((student) => {
          return (
              <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='/images/avatar/large/steve.jpg'
        />
        <Card.Header>{student.first_name} {student.last_name}</Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
        <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' as={NavLink} to={'/students/' + student.id}>
            View
          </Button>
          <Button basic color='red'>
            Contact
          </Button>
        </div>
      </Card.Content>
    </Card>
          )
        })
      }

    </Card.Group>
      </div>
  );
};

export default Students;

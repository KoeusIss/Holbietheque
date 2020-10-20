import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Image,
  Header,
  Search,
  Grid,
  Segment,
  Icon,
  Pagination,
} from "semantic-ui-react";
import SearchExampleStandard from "../../components/search";

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
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" icon="student" content="Student list" />
          </Grid.Column>
          <Grid.Column floated="right">
            <SearchExampleStandard source={students} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Card.Group>
            {students.map((student) => {
              return (
                <div>
                  <Card>
                    <Card.Content>
                      <Image
                        floated="right"
                        size="mini"
                        src="/images/avatar/large/steve.jpg"
                      />
                      <Card.Header>
                        {student.first_name} {student.last_name}
                      </Card.Header>
                      <Card.Meta>Friends of Elliot</Card.Meta>
                      <Card.Description>
                        Steve wants to add you to the group{" "}
                        <strong>best friends</strong>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button
                          basic
                          color="green"
                          as={NavLink}
                          to={"/students/" + student.id}
                        >
                          View
                        </Button>
                        <Button basic color="red">
                          Contact
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              );
            })}
          </Card.Group>
        </Grid.Row>
        <Pagination
          defaultActivePage={5}
          ellipsisItem={{
            content: <Icon name="ellipsis horizontal" />,
            icon: true,
          }}
          firstItem={{ content: <Icon name="angle double left" />, icon: true }}
          lastItem={{ content: <Icon name="angle double right" />, icon: true }}
          prevItem={{ content: <Icon name="angle left" />, icon: true }}
          nextItem={{ content: <Icon name="angle right" />, icon: true }}
          totalPages={10}
        />
      </Grid>
    </div>
  );
};

export default Students;

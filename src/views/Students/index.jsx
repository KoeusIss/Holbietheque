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
  Container,
  Divider,
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
            <Header as="h2" style={{ margin: "auto 10% auto 5%" }}>
              <Image src={require("../../images/students_list.png")} />
              Students list
            </Header>
          </Grid.Column>
          {/* <Grid.Column width="1">
            <SearchExampleStandard source={students} />
          </Grid.Column> */}
        </Grid.Row>
        <Grid.Row style={{ margin: "auto 10% auto 15%" }}>
          <Container>
            <Card.Group doubling>
              {students.map((student) => {
                return (
                  <div>
                    <Card centered>
                      <Card.Content>
                        <Image
                          floated="right"
                          verticalAlign="top"
                          size="tiny"
                          rounded="true"
                          src={student.image}
                        />
                        <Card.Header>{student.full_name}</Card.Header>
                        <Card.Meta>Cohort #{student.cohort.name}</Card.Meta>
                        <Card.Meta>{student.specialization.name}</Card.Meta>
                        <Card.Description>{student.about_me}</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button
                            basic
                            color="blue"
                            as={NavLink}
                            to={"/students/" + student.id}
                          >
                            View
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>
                    <Divider inverted />
                  </div>
                );
              })}
            </Card.Group>
          </Container>
        </Grid.Row>

        {/* <Pagination
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
        /> */}
      </Grid>
    </div>
  );
};

export default Students;

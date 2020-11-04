/**
 * Contact views
 */
import React from "react";
import {
  Button,
  Grid,
  Popup,
  Form,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";

/**
 * Contact component provide a space fr users to contact creators
 * and admins of the page, its a set of fields to asking email,
 * subject and text for message
 * @returns {JSX.Element}
 * @constructor
 */
const Contact = () => (
  <Grid>
    <Grid.Row style={{ padding: "10em 45em" }}>
      <Grid.Column>
        <Form success>
          <Form.Input
            style={{ width: "370px" }}
            label="Email"
            placeholder="joe@schmoe.com"
          />
          <Form.Input
            style={{ width: "370px" }}
            label="Subject"
            placeholder="subject"
          />
          <Form.Input style={{ height: "300px" }} label="Body" />
          <Popup
            trigger={<Button>Submit</Button>}
            success
            header="Form Completed"
            on="click"
            hideOnScroll
          />
          <Button as={NavLink} to="./" style={{ color: "red" }}>
            Cancel
          </Button>
        </Form>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Contact;

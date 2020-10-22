//
// Login views
//

import React, {useState} from "react";
import {useHistory, Link, NavLink} from "react-router-dom";
import AuthService from '../../services/auth_service'
import {toaster} from "evergreen-ui";
import {
    Grid,
    Segment,
    Form,
    Button,
    Message,
    Image,
    Header,
} from "semantic-ui-react";


function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const history = useHistory();
    const [loginError, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        AuthService.login(user).then(
            () => {
                history.push("/");
                setLoading(false);
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
                toaster.notify(loginError, {duration: 5})
            }
        );
    };

    return (
        <Grid textAlign="center" verticalAlign="middle" style={{height: "80vh"}}>
            <Grid.Column style={{maxWidth: 450}}>
                {loginError ? (
                    <Header textAlign="left" intent="danger" title={loginError}/>
                ) : null}
                <Image
                    circular
                    src="https://www.holbertonschool.com/holberton-logo.png"
                    as={NavLink}
                    to="/"
                />
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Header>Login</Header>
                        <Form.Input
                            name="email"
                            placeholder="E-mail address"
                            icon="user"
                            iconPosition="left"
                            onChange={handleChange}
                            error={!!loginError}
                        />
                        <Form.Input
                            name="password"
                            placeholder="Password"
                            icon="lock"
                            iconPosition="left"
                            type="password"
                            onChange={handleChange}
                            error={!!loginError}
                        />
                        <Button
                            color="pink"
                            fluid
                            size="large"
                            onClick={handleChange}
                            loading={loading}
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New here? - <Link to="/signup">Sign Up</Link>
                </Message>
                <Message>
                    Forget your password? -{" "}
                    <Link to="/recover">Recover your password</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login;

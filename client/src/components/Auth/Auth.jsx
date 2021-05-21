import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "../../action/posts";
import { signup, signin } from "../../action/auths";

function Auth() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleShowPassword = () => setShowPassword((prevstate) => !prevstate);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }

  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleMode = () => {
    setIsSignup((previsSignup) => !previsSignup);
    setShowPassword(false);
  };

  const responseGoogle = async (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId;
    dispatch(authUser(result, token));
    history.push("/");
    // console.log(response);
  };
  const failresponseGoogle = (error) => {
    console.log(error);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={handleMode}>
                  {isSignup ? "Already have account" : "Dont have "}
                </Button>
              </Grid>
            </Grid>
            <GoogleLogin
              clientId="774805612174-eh9vhheqrop7gtg539f6iig3bfheulg6.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  fullWidth
                >
                  Google Login
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={failresponseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Auth;

import React, { useState } from 'react';
import { Avatar, Button, Grid, Paper, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockedOutLinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
function Auth() {

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }
    const switchMode = () => {
        setIsSignup(prevState => !prevState);
    }
    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId
        try {
            dispatch({ type: "AUTH", payload: { result, token } });

            history.push('/');
        } catch (error) {
            console.log(error);
        }

    }
    const googleFailure = (error) => {
        console.log("google Failure", error)
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockedOutLinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autofocuse half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} autofocuse half />
                                </>
                            )
                        }
                        <Input type="email" label="Email Adderss" name="email" handleChange={handleChange} />
                        <Input type={showPassword ? "text" : "password"} label="Your Password" name="password" handleChange={handleChange} handleShow={handleShowPassword} />
                        {isSignup && <Input type="password" name="confirmPassword" label="Repeat Password" handleChange={handleChange} />}
                    </Grid>
                    <Button type="submit" variant="contained" className={classes.submit} fullWidth color="primary">
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="43927749705-lhnl3qocnkjk96883ad07nfed6g4pcr6.apps.googleusercontent.com"
                        renderProps={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                onClick={renderProps.onClick}
                                color="primary"
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                                fullWidth>
                                Google Signin
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? singin" : "Donot have an acc ?"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
export default Auth;
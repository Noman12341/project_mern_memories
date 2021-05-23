import React, { useState } from 'react';
import { Avatar, Button, Grid, Paper, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockedOutLinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';

function Auth() {
    const classes = useStyles();
    const isSignup = false;
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleChange = () => {

    }
    const handleSubmit = () => {

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
                                    <Input name="firstName" lable="First Name" handleChange={handleChange} autoFocuse half />
                                    <Input name="lastName" lable="Last Name" handleChange={handleChange} autoFocuse half />
                                </>
                            )
                        }
                        <Input type="email" lable="Email Adderss" name="email" handleChange={handleChange} />
                        <Input type={showPassword ? "text" : "password"} lable="Your Password" name="password" handleChange={handleChange} handleShow={handleShowPassword} />
                        {isSignup && <Input type="password" name="confirmPassword" lable="Repeat Password" handleChange={handleChange} />}
                    </Grid>
                    <Button type="submit" variant="contained" className={classes.submit} fullWidth color="primary">
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
export default Auth;
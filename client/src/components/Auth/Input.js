import React from 'react';
import { TextField, InputAdornment, Grid, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, handleShow, lable, autoFocuse, type, half }) => {

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                lable={lable}
                autoFocuse={autoFocuse}
                type={type}
                InputProps={name === "password" && {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShow}>
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Grid>
    );
}
export default Input;
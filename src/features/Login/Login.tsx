

import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import { Redirect } from 'react-router-dom';
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {LoginErrorParamsType, LoginParamsType} from "../TodolistsList/TodolistsList";



export const Login = () => {
    const dispatch = useDispatch()
    const validate = (values: LoginParamsType) => {
        const errors: LoginErrorParamsType = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 5) {
            errors.password = 'password is small';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values))
            // alert(JSON.stringify(values));
        },
    })

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    if(isLoggedIn){
        return <Redirect to={'/'}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        {...formik.getFieldProps('email')}
                        // name="email"
                        // onChange={formik.handleChange}
                        // value={formik.values.email}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        {...formik.getFieldProps('password')}
                        // name="password"
                        // onChange={formik.handleChange}
                        // value={formik.values.password}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}

                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox
                            {...formik.getFieldProps('rememberMe')}
                            // name="rememberMe"
                            // onChange={formik.handleChange}
                            // value={formik.values.rememberMe}
                        />}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}

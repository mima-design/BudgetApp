import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axiosRequests from "../axiosShortcuts";

export default function LoginView(props) {
  const [ name, setName ] = useState("");
  const [ pwd, setPWD ] = useState("");

  const onNameChange = (e, value) => {
    setName(e.target.value);
  }

  const onPwdChange = (e, value) => {
    setPWD(e.target.value);
  }

  const submitData = () => {
    axiosRequests.post(
      "/auth/", 
      {
        username: name,
        password: pwd
      },
      (resp) => {
        axiosRequests.setAuthToken(`Token ${resp.data.token}`);
        props.changeApp("budget");
      }
    );
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh', marginTop: "50px" }}
    >
      <Grid item xs={3}>
        <Box component="form" sx={{ padding: 5, border: '1px solid grey', borderRadius: "10px" }}>
          <Grid item xs={12}>
            <FormControl variant="standard">
              <InputLabel htmlFor="user-field">User</InputLabel>
              <Input
                id="user-field"
                value={name}
                onChange={onNameChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="standard">
              <InputLabel htmlFor="pwd-field">Password</InputLabel>
              <Input
                id="pwd-field"
                value={pwd}
                onChange={onPwdChange}
                type="password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} alignContent="center">
            <Button 
              variant="contained"
              onClick={submitData}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
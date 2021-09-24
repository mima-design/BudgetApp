import React from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import BudgetList from "./budgetList";

export default class Dashboard extends React.Component {

  logout = () => {
    // will log out user
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={this.logout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Grid container>
            <BudgetList />
          </Grid>
      </Box>
    );
  }
}
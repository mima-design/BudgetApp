import React from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import BudgetList from "./budgetList";
import CategoryDialog from "./components/categoryDialog";
import axiosRequests from "../axiosShortcuts";

export default class Dashboard extends React.Component {

  state = {
    showCategoryDialog: false,
  }

  logout = () => {
    axiosRequests.get("/logout/", () => {
      axiosRequests.removeAuthToken();
      this.props.changeApp("login");
    });
  }

  onCategoryBtnClick = () => {
    this.setState({showCategoryDialog: true});
  }

  onCloseCategoryDialog = () => {
    this.setState({showCategoryDialog: false});
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={this.logout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Grid container style={{marginTop: "10px"}}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={this.onCategoryBtnClick}
            >
              Categories
            </Button>
          </Grid>
          <BudgetList />
        </Grid>
        { this.state.showCategoryDialog && <CategoryDialog 
          open={this.state.showCategoryDialog}
          onClose={this.onCloseCategoryDialog}
        /> }
      </Box>
    );
  }
}
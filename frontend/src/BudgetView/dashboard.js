import React from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import BudgetList from "./budgetList";
import CategoryDialog from "./components/categoryDialog";
import axiosRequests from "../axiosShortcuts";
import { CircularProgress } from "@mui/material";
import { connect } from "react-redux";
import { getCurrentUser } from "../redux/actions/users";


class Dashboard extends React.Component {

  state = {
    isLoading: false,
    showCategoryDialog: false,
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.getCurrentUser(() => this.setState({isLoading: false}));
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
      this.state.isLoading ? 
        <CircularProgress/> 
      : <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Grid container>
            <Grid item xs={11}>
              <Toolbar>
                <Button color="inherit" onClick={this.logout}>Logout</Button>
              </Toolbar>
            </Grid>
            <Grid item xs={1} alignContent={"center"}>
              <div style={{color: "#ffffff"}}><b>{this.props.user.username}</b></div>
            </Grid>
          </Grid>
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
        </Grid>
        <BudgetList />
        { this.state.showCategoryDialog && <CategoryDialog 
          open={this.state.showCategoryDialog}
          onClose={this.onCloseCategoryDialog}
        /> }
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.info
});

const mapDispatchToProps = {
  getCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
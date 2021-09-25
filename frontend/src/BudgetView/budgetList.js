import { Button, Grid } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import React from "react"
import { connect } from "react-redux";
import { getBudgetsData, deleteBudget, postBudget } from "../redux/actions/budgets";
import { getUsers } from "../redux/actions/users";
import { getCategoriesData } from "../redux/actions/categories";
import AddIcon from '@mui/icons-material/Add';
import BudgetBox from "./components/budgetBox";


class BudgetList extends React.Component {

  state = {
    isLoading: true,
    showCategoryDialog: false,
    page: 1,
    pageSize: 25,
  }

  componentDidMount() {
    this.getPageData(this.state.page);
    //todo: add one loading state for all requests, mayby promise all or sth
    this.props.getCategoriesData();
    this.props.getUsers();
  }

  getPageData(page) {
    this.setState({isLoading: true});
    this.props.getBudgetsData(
      `?page=${page}&page_size=${this.state.pageSize}`, 
      () => this.setState({isLoading: false})
    );
  }

  addNewBudget = () => {
    this.props.postBudget({});
  }

  render() {
    return (this.state.isLoading ? 
          <CircularProgress/> 
        : <Grid container>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={this.addNewBudget}
              >
                <AddIcon /> Add Budget
              </Button>
            </Grid>
            <Grid container>
              {this.props.budgets.map((item) => (
                <Grid key={item.id} item xs={4}><BudgetBox budget={item} /></Grid>
              ))}
            </Grid>
          </Grid>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
  budgets: state.budgets
});

const mapDispatchToProps = {
  getBudgetsData,
  deleteBudget,
  postBudget,
  getCategoriesData,
  getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetList);
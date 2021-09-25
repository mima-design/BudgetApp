import { CircularProgress } from "@mui/material";
import React from "react"
import axiosRequests from "../axiosShortcuts";
import CategoryDialog from "./components/categoryDialog";

import Button from '@mui/material/Button';


export default class BudgetList extends React.Component {

  state = {
    isLoading: true,
    showCategoryDialog: false,
  }

  componentDidMount() {
    this.getUserBudgets();
  }

  getUserBudgets(id) {
    axiosRequests.get("/budget/", this.onBudgetSuccess);
  }

  onBudgetSuccess = (respData) => {
    this.setState({
      isLoading: false,
      budgets: respData.data
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
      <div>
        { this.state.isLoading ? 
          <CircularProgress/> 
        : <div>
            <Button
              variant="contained"
              onClick={this.onCategoryBtnClick}
            >
              Categories
            </Button>
        </div> }
        { this.state.showCategoryDialog && <CategoryDialog 
          open={this.state.showCategoryDialog}
          onClose={this.onCloseCategoryDialog}
        /> }
      </div>
    );
  }

}
import { CircularProgress } from "@mui/material";
import React from "react"
import axiosRequests from "../axiosShortcuts";

export default class BudgetList extends React.Component {

  state = {
    isLoading: true
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

  render() {
    return (
      <div>
        { this.state.isLoading ? 
          <CircularProgress/> 
        : <div>
          {
            this.state.budgets.map((item) => (<span key={item.id}>{item.id}</span>)) //tmp method
          }
        </div> }
      </div>
    );
  }

}
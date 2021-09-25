import { Grid, TextField, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import { connect } from "react-redux";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { ENTRY_TYPE, postEntry, deleteEntry } from "../../redux/actions/entries";
import ShareDialog from "./shareDialog";

class BudgetBox extends React.Component {

  state = {
    incomeValue: "",
    expenseValue: "",
    showShareDialog: false
  }

  onExpenseChange = (e) => {
    this.setState({expenseValue: e.target.value});
  }

  onIncomeChange = (e) => {
    this.setState({incomeValue: e.target.value});
  }

  retrieveAndSortEntries(type) {
    const output = this.props.budget.budget_entry.filter((item) => item.type === type);
    return output;
  }

  addIncomeEntry = () => {
    this.addEntry(this.state.incomeValue, ENTRY_TYPE.income);
    this.setState({incomeValue: 0});
  }

  addExpanseEntry = () => {
    this.addEntry(this.state.expenseValue, ENTRY_TYPE.expenses);
    this.setState({expenseValue: 0});
  }

  addEntry(quantity, type, category) {
    this.props.postEntry({quantity, type, budget: this.props.budget.id});
  }

  onShowShareDialog = () => {
    this.setState({showShareDialog: true});
  }

  onCloseShareDialog = () => {
    this.setState({showShareDialog: false});
  }

  deleteBudget = () => {
    this.props.deleteBudget(this.props.budget.id);
  }

  render() {
    const expenses = this.retrieveAndSortEntries(ENTRY_TYPE.expenses);
    const income = this.retrieveAndSortEntries(ENTRY_TYPE.income);
    const budgetSum = income.reduce((sum, item) => sum + parseFloat(item.quantity), 0) 
      - expenses.reduce((sum, item) => sum + parseFloat(item.quantity), 0);

    return (
      <Box style={{border: "1px solid grey", padding: 5, margin: 5}}>
        <Grid container>
          <Grid item xs={12} style={{borderBottom: "1px solid black"}}>
              <b>Budget no.</b>{this.props.budget.id}
              
              { this.props.budget.owner === this.props.currentUser.id &&
                <Button 
                  variant="contained"
                  onClick={this.deleteBudget}
                  style={{float: "right"}}
                >
                  Delete
                </Button>
              }
              { this.props.budget.owner === this.props.currentUser.id &&
                <Button 
                  variant="contained"
                  onClick={this.onShowShareDialog}
                  style={{float: "right"}}
                >
                  Share With
                </Button>
              }
          </Grid>
          <Grid container style={{marginTop: 10}}>
            <Grid item xs={6}>
              <b>Income</b>
              {income.map((item) => {
                return (<div key={`entry_${item.id}`}>
                  {item.quantity}
                </div>)
              })}
            <div>
              <TextField 
                value={this.state.incomeValue}
                onChange={this.onIncomeChange}
                type="number"
              />
              <Button
                onClick={this.addIncomeEntry}
              >
                <AddIcon />
              </Button>
            </div>
            </Grid>
            <Grid item xs={6}>
            <b>Expanses</b>
              {expenses.map((item) => {
                return (<div key={`entry_${item.id}`}>
                  {item.quantity}
                </div>)
              })}
              <div>
                <TextField 
                  value={this.state.expenseValue}
                  onChange={this.onExpenseChange}
                  type="number"
                />
                <Button
                  onClick={this.addExpanseEntry}
                >
                  <AddIcon />
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <b>Total:</b> {budgetSum.toFixed(2)}
          </Grid>
        </Grid>
        { this.state.showShareDialog && <ShareDialog 
          onClose={this.onCloseShareDialog} 
          open={this.state.showShareDialog}
          budget={this.props.budget}

        />}
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
  budgets: state.budgets,
  currentUser: state.info
});

const mapDispatchToProps = {
  postEntry,
  deleteEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetBox);
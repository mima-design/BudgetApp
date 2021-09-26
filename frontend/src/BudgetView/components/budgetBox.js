import { Grid, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import { connect } from "react-redux";
import React from "react";
import { ENTRY_TYPE, postEntry, deleteEntry } from "../../redux/actions/entries";
import ShareDialog from "./shareDialog";
import EntryList from "./entryList";

class BudgetBox extends React.Component {

  state = {
    incomeValue: "",
    expenseValue: "",
    showShareDialog: false,
    expanseCategory: null,
    incomeCategory: null,
  }

  onExpanseCategoryChange = (e) => {
    this.setState({expanseCategory: e.target.value});
  }

  onIncomeCategoryChange = (e) => {
    this.setState({incomeCategory: e.target.value});
  }

  onExpenseChange = (e) => {
    this.setState({expenseValue: e.target.value});
  }

  onIncomeChange = (e) => {
    this.setState({incomeValue: e.target.value});
  }

  retrieveAndSortEntries(type) {
    let output = Object.fromEntries(this.props.categories.map((category) => [category.id, {name: category.name, values: []}]));
    let count = 0;
    output["None"] = {name: "No category", values: []};

    for (const entry of this.props.budget.budget_entry) {
      let tmp_category;
      if (entry.type !== type)
        continue
      
      count += parseFloat(entry.quantity);

      if (entry.category === null) {
        tmp_category = output["None"];
      } else {
        tmp_category = output[entry.category];
      }

      tmp_category.values.push(entry);

    }

    return [Object.values(output), count];
  }

  addEntry = (quantity, type, category) => {
    this.props.postEntry({quantity, type, budget: this.props.budget.id, category});
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
    const [expensesList, expensesValue] = this.retrieveAndSortEntries(ENTRY_TYPE.expenses);
    const [incomeList, incomeValue] = this.retrieveAndSortEntries(ENTRY_TYPE.income);
    const budgetSum = incomeValue - expensesValue;

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
            <EntryList
              categories={this.props.categories}
              entryList={incomeList}
              label={"Expanses"}
              onAddHandler={this.addEntry}
              type={ENTRY_TYPE.income}
            />
            <EntryList
              categories={this.props.categories}
              entryList={expensesList}
              label={"Expanses"}
              onAddHandler={this.addEntry}
              type={ENTRY_TYPE.expenses}
            />
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
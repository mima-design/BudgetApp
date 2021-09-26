import React from "react"
import { Button } from "@material-ui/core";
import Dialog from "../../components/dialogs";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/users";
import { putBudget } from "../../redux/actions/budgets";
import { CircularProgress } from "@mui/material";

class ShareDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: this.props.budget.shared_with,
      users: this.props.users.filter((user) => user.id !== this.props.currentUser.id)
    }
  }

  changeSelection(value, id) {
      this.setState((prevState) => {
        const selectedUsers = [...this.state.selectedUsers];
        if (value) {
          selectedUsers.push(id);
        } else {
          const idx = selectedUsers.indexOf(id);
          selectedUsers.splice(idx, 1);
        }
        return {selectedUsers}
      });
  }

  saveShared = () => {
    this.props.putBudget(this.props.budget.id, {shared_with: this.state.selectedUsers});
    this.props.onClose();
  }
 
  render() {
    return (
      <Dialog
        onClose={this.props.onClose}
        open={this.props.open}
        width={"50vw"}
        height={"60vh"}
        title="Share budget with"
        actions={[
          (<Button 
              key={`save_shared_btn`}
              variant="contained"
              onClick={this.saveShared}
            >
            Save
          </Button>),
        ]}
      >
        { this.state.isLoading ? 
        <CircularProgress />
        : <div>
          <FormGroup>
            {this.state.users.map((user) => {
              if (user.id === this.props.currentUser.id)
                return null;

              return (
                <FormControlLabel key={`user_${user.id}`} control={
                    <Checkbox onChange={(e, value) => this.changeSelection(value, user.id)} checked={this.state.selectedUsers.includes(user.id)} />
                  } 
                  label={user.username} 
                />
              );
            })}
          </FormGroup>
            
          </div>
        }
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  users: state.users,
  currentUser: state.info
});

const mapDispatchToProps = {
  getUsers,
  putBudget
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareDialog);
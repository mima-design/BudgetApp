import React from "react"
import Dialog from "../../components/dialogs";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { getCategoriesData, putCategory, deleteCategory, postCategory} from "../../redux/actions/categories";
import { CircularProgress } from "@mui/material";
import tableIcons from "../../components/mtIcons";

class CategoryDialog extends React.Component {

  state = {
    isLoading: false,
  }

  tableRef = React.createRef();

  componentDidMount() {
    if (!this.props.categories?.length) {
      this.setState({isLoading: true});
      this.props.getCategoriesData(() => this.setState({isLoading: false}));
    }
  }

  addCategory = (newData) => {
    return new Promise((resolve, reject) => {
      this.props.postCategory(newData); 
      resolve();
    });
  }

  updateCategory = (newData) => {
    return new Promise(() => (resolve, reject) => {
      this.props.putCategory(newData.id, newData);
      resolve();
    });
  }

  removeCategory = (rowData) => {
    return new Promise((resolve, reject) => {
      this.props.deleteCategory(rowData.id);
      resolve();
    });
  }

  render() {
    return (
      <Dialog
        onClose={this.props.onClose}
        open={this.props.open}
        width={"50vw"}
        height={"60vh"}
        title="Categories"
      >
        { this.state.isLoading ? 
        <CircularProgress />
        : <div>
            <MaterialTable
              options={{
                showTitle: false
              }}
              tableRef={this.tableRef}
              icons={tableIcons}
              data={this.props.categories}
              columns={[
                {field: "id", title: "ID", editable: "never"},
                {field: "name", title: "Name"}
              ]}
              editable={{
                onRowAdd: this.addCategory,
                onRowUpdate: this.updateCategory,
                onRowDelete: this.removeCategory
              }}
            />
          </div>
        }
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories
});

const mapDispatchToProps = {
  getCategoriesData,
  putCategory,
  deleteCategory,
  postCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDialog);
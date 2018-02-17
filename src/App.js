import React, { Component, PropTypes } from 'react';
import { Button, Label, Well, ListGroup } from 'react-bootstrap';

import logo from "./assets/img/hycabp.png";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import store from "./rdx/index";
import { addToDoItem, updateToDoItem, deleteToDoItem } from "./rdx/actions/index";

import { ListItemComp } from "./components/ListComponent";

// Using CSS Modules mechanism
import styles from "./assets/css/style.css";

////////////////////////////////////////////////////////////////////////////////
class App extends Component {

  constructor(state, props) {
    super(state, props);
    this.state = {
      bShow: false
    };
  }

  showSettings() {
    this.setState({bShow: !this.state.bShow });
  }

  onAdd() {
    console.log("Going to add: " + this.refs.newToDoItem.value);
    var newToDoItem = {};
      newToDoItem.id = this.props.uniqueid;
      newToDoItem.item = this.refs.newToDoItem.value;
      newToDoItem.isChecked = false;
      newToDoItem.fcbDelete = this.onDelete.bind(this);
      newToDoItem.fcbUpdate = this.onUpdate.bind(this);

    store.dispatch(
      addToDoItem({
        id: newToDoItem.id,
        item: newToDoItem.item,
        isChecked: newToDoItem.isChecked,
        fcbDelete: newToDoItem.fcbDelete,
        fcbUpdate: newToDoItem.fcbUpdate,
      })
    );
    this.forceUpdate();
  }

  onUpdate(itemObject) {
    console.log("Requesting updation of item " + JSON.stringify(itemObject) );

    // I should check whether any element has changed or not...
    store.dispatch(
      updateToDoItem({
        id: itemObject.id,
        item: itemObject.item,
        isChecked: itemObject.isChecked,
        fcbDelete: itemObject.fcbDelete,
        fcbUpdate: itemObject.fcbUpdate,
      })
    );
    this.forceUpdate();
  }

  onDelete(itemObject) {
    console.log("In onDelete ... " + JSON.stringify(itemObject));

    store.dispatch(
      deleteToDoItem({
        id: itemObject.id,
        item: itemObject.item,
        isChecked: itemObject.isChecked,
        fcbDelete: itemObject.fcbDelete,
        fcbUpdate: itemObject.fcbUpdate,
      })
    );
  }

  render() {
    console.log("In Render: " + JSON.stringify(this.props.ToDoData) );

    var listItems = this.props.ToDoData.map(
      (toDoItem) =>
      <ListItemComp key={toDoItem.id} obj={toDoItem}></ListItemComp>
    );

    return (
      <div className={styles.bpApp}>
        <div>
          <img src={logo} height="64px" />
          <h1>ToDux</h1>
        </div>
        <Well>
          <Label bsStyle="primary"> Items left : {this.props.ToDoData.length>this.props.done?this.props.ToDoData.length-this.props.done:0}</Label>{"  "}
          <Label bsStyle="success"> Items done : {this.props.done}</Label>{"  "}
          <Label bsStyle="info"> Total : {this.props.ToDoData.length}</Label>{"  "}
          <Label bsStyle="danger"> Archieved Items :  {this.props.archived}</Label>{"  "}
        </Well>
        <hr></hr>
        <div>
          <div class="input-group">
            <input ref="newToDoItem" type="text" class="form-control" placeholder="To Do Item ..."></input>
            <span class="input-group-btn">
              <button class="btn btn-primary" type="button" onClick={this.onAdd.bind(this)}> Add </button>
            </span>
          </div>
        </div>
        <div>
          <ListGroup className={styles.bpDiv}>
            {listItems}
          </ListGroup>
        </div>
      </div>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////
const mapStateToProps = state => {
  return {
    uniqueid: state.uniqueid,
    ToDoData: state.ToDoData,
    done: state.done,
    archived: state.archived,
  };
};
export default App = connect(mapStateToProps)(App);

////////////////////////////////////////////////////////////////////////////////

import React, { Component, PropTypes } from 'react';
import { Button, Well, Label, ListGroupItem  } from 'react-bootstrap';

// Using CSS Modules mechanism
import styles from "../assets/css/style.css";

export class ListItemComp extends Component {

  onCheck() {
    this.props.obj.isChecked = !this.props.obj.isChecked;
    if(this.props.obj.fcbUpdate) {
      this.props.obj.fcbUpdate(this.props.obj);
    }
  }

  onDelete(id) {
    console.log("Deleting: " + id);
    if(this.props.obj.fcbDelete) {
      this.props.obj.fcbDelete(this.props.obj);
    }
  }

  render() {
    var obj = this.props.obj;

    return <ListGroupItem>
        <span>
          <input type="checkbox" onClick={this.onCheck.bind(this)} checked={obj.isChecked} style={{display: obj.isChecked?'none':'' }}>
          </input>
          <span style={{display: !obj.isChecked?'none':'' }} class="glyphicon glyphicon-ok-circle">
          </span>
        </span>
        <span>
          <span className={styles.bpItems}>
            <Label bsStyle="default">{obj.id}</Label>
          </span>
        </span>
        <span>
          <span className={styles.bpItems}>
            {obj.item}
          </span>
        </span>
        <span style={{display: obj.isChecked?'':'none' }} className={styles.bpRight}>
          <button class="btn btn-sm btn-danger" onClick={this.onDelete.bind(this, obj.id )}>
            <span class="glyphicon glyphicon-trash"></span>
          </button>
        </span>
    </ListGroupItem>;
  }
}

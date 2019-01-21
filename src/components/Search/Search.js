import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, Table, message, Popconfirm, Input, Tabs, Select, Icon  } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;


class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  
  state = {
    loading: false,
    searchString: ''
  };

  handleChange(e) {
    this.state.searchString = e.target.value;
    let valuesData = this.props.valuesCheck;
    let newValuesData = [];
    let boolValue = true;

    if(this.state.searchString.length > 0){
      const data = valuesData;
      let searchString = this.state.searchString.trim().toLowerCase();
      newValuesData = valuesData.filter(function(l){
        if(l.hasOwnProperty("key")){
          boolValue = true;
          return(l.name.toLowerCase().match(searchString) || l.address.toLowerCase().match(searchString));
        }
        else{
          boolValue = false;
          return(l.name.toLowerCase().match(searchString));
        }
      });
    }
    else{
      newValuesData = this.props.valuesCheck;
    }
    this.props.getResults(newValuesData, boolValue);
  }

  render() {
    let state = this.state;
    return (
      <div>
        <Input className="form-control" onChange={this.handleChange} placeholder="Search" />,
      </div>
    );
  }
}
export default Search;

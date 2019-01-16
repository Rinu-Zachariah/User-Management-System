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
    let valuesData = this.props.valuesData;
    console.log(valuesData);
    if(this.state.searchString.length > 0){
      const data = valuesData;
      let searchString = this.state.searchString.trim().toLowerCase();
      valuesData = valuesData.filter(function(l){;
        return(l.name.toLowerCase().match(searchString));
      });
      console.log(valuesData)
    }
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

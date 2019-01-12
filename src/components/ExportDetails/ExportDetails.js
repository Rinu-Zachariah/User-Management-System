import React, { Component } from 'react';
import axios from 'axios';
import './ExportDetails.css';
import { Button, Icon, Row, Col, message } from 'antd';
import Divider from '../Divider/Divider';

class ExportDetails extends Component {
  componentDidMount() {
    let state = this.state;
    state.loading = true;
  }

  state = {
    loading: false, //for displaying the loading icon, and disabling the form items   
    iconLoading: false,
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
    axios({
      url: 'export_details.xlsx',
      method: 'GET',
      responseType: 'blob',
    }).then(response => {
      this.setState({ iconLoading: false });
      const checkUrlObject = window.URL.createObjectURL(new Blob([response.data]));
      const createElementObject = document.createElement('a');
      createElementObject.href = checkUrlObject;
      createElementObject.setAttribute('download', 'export_details.xlsx'); //or any other extension
      document.body.appendChild(createElementObject);
      createElementObject.click();
      message.success('Xlsx downloaded successfully');
    })
    .catch(error => {
      message.error('Something went wrong, please refresh and try again');
      this.setState({ iconLoading: false });
    });  

  }

  render() {
    let state = this.state;

    return (
      <div>
        <Divider text={'Download User Data'}/>
        <Row className="content marginExportStyles" type="flex" align="middle" justify="space-around">
          <Col className="column-element-padding">
            <Button type="primary" className="exportButtonStyle" icon="export" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
              {'Export Data'}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ExportDetails;

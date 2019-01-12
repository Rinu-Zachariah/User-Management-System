import React, { Component } from 'react';

class UnauthorizedAccess extends Component {

  render() {
    return (
      <div className="unauthorized-access">
      	{ 'You are not authorized to access this application. Please contact admin.' }
      </div>
    );
  }
}

export default UnauthorizedAccess;

'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
/**
 * @name App
 * @description
 *  React js Index route App Component
 */
class App extends Component {
  /**
   * class constructor -> overriding
   * @param {object} props properties
   */
  constructor(props) {
    super(props);
  }

  /**
   * react render function
   * @returns {XML}
   */
  render() {
    return (
      <div className="main_div">
        <div className="col-xs-12 height_div">
          { this.props.children }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
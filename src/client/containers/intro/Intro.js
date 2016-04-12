import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Intro extends Component {
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
      <div>
        <h1>Hello World!</h1>
        <Link to="/question/1234/questionTitle">Questions</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Intro);
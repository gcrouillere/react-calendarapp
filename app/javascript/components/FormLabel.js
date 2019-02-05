import React from "react"
import PropTypes from "prop-types"

class FormLabel extends React.Component {

  render () {
    return (
      <React.Fragment >
      <h2>{this.props.label}</h2>
      </React.Fragment>
    );
  }
}

export default FormLabel

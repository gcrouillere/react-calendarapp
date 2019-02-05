import React from "react"
import PropTypes from "prop-types"
import moment from 'moment'

class Appointment extends React.Component {

  render () {
    return (
      <React.Fragment >
      <div className="appointment">
        <h3>{this.props.appointment.title}</h3>
        <p>{moment(this.props.appointment.apt_time).format('MMMM DD YY, h:mm:ss a')}</p>
      </div>
      </React.Fragment>
    );
  }
}

export default Appointment

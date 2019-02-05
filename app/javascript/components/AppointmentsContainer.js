import React from "react"
import PropTypes from "prop-types"
import Appointment from "./Appointment"

class AppointmentsContainer extends React.Component {

  render () {
    return (
      <React.Fragment>
        <h2>Appointments</h2>
        <div>
          {this.props.appointments.map(appointment => {
            return (
              <Appointment appointment={appointment} key={appointment.id}/>
            )
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default AppointmentsContainer

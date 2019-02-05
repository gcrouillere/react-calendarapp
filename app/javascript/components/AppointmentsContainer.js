import React from "react"
import PropTypes from "prop-types"
import Appointment from "./Appointment"

const AppointmentsContainer = ({appointments}) =>
  <div>
    <h2>Appointments</h2>
    {appointments.map(appointment => {
      return (
        <Appointment appointment={appointment} key={appointment.id}/>
      )
    })}
  </div>

export default AppointmentsContainer

import React from "react"
import PropTypes from "prop-types"
import moment from 'moment'

const Appointment = ({appointment}) =>
      <div className="appointment">
        <h3>{appointment.title}</h3>
        <p>{moment(appointment.apt_time).format('MMMM DD YY, h:mm:ss a')}</p>
      </div>

export default Appointment

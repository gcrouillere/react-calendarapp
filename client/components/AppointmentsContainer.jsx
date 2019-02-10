import React from "react"
import PropTypes from "prop-types"
import Appointment from "./Appointment"


class AppointmentsContainer extends React.Component {

   constructor(props) {
     super(props)
   }

  render() {

    return(<div>
            {!this.props.disabled && this.props.appointments.map((appointment) => {
              return(<Appointment appointment={appointment} key={appointment.id} />)
            })}
          </div>)

  }
}

export default AppointmentsContainer

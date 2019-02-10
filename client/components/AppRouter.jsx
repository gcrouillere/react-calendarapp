import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Appointments from './Appointments'
import Appointment from './Appointment'
import AppointmentForm from "./AppointmentForm"
import { AppHeader } from './AppHeader';

export default (props) => {
  return (
    <Router>
      <div>
        <AppHeader />
        <Route exact path="/" render={routeProps => (
          <Appointments {...routeProps} appointments={props.appointments} authenticity_token={props.authenticity_token}/>
        )}/>
        <Route exact path="/appointments/:id" component={Appointment} />
        <Route exact path="/appointments/:id/edit" render={routeProps => (
          <div>
            <Appointments {...routeProps} appointments={props.appointments} authenticity_token={props.authenticity_token}/>
          </div>
        )}/>
      </div>
    </Router>
  )
}

import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Appointments from './Appointments'
import Appointment from './Appointment'
import AppointmentForm from "./AppointmentForm"
import { AppHeader } from './AppHeader';

export default (props) => {
  // const a = withRouter(props => props)
  // console.log(a)
  // let homeAndAptEditPathsRegexp = new RegExp(/^\/appointments\/:id\/edit$|^\/$/);
  // let homeAndAptEditPaths = homeAndAptEditPathsRegexp.test(props.match.path) ? props.match.path : "";

  return (
    <Router>
      <div>
        <AppHeader />
        {["/", "/appointments/:id/edit"].map(path =>
          <Route exact path={path} render={routeProps => (
            <Appointments {...routeProps} appointments={props.appointments} authenticity_token={props.authenticity_token}/>
          )}/>)
        }
        <Route exact path="/appointments/:id" component={Appointment} />
      </div>
    </Router>
  )
}

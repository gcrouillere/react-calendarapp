import React from "react"
import PropTypes from "prop-types"
import Appointment from "./Appointment"
import AppointmentForm from "./AppointmentForm"
import AppointmentsContainer from "./AppointmentsContainer"
import update from 'immutability-helper'
import $ from 'jquery'
import moment from 'moment'

class Appointments extends React.Component {

  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  static defaultProps = {
    appointments: []
  }

  constructor(props){
    super(props)
    this.state = {
      appointments: this.props.appointments
    }
  }

  componentDidMount () {
    $.ajax({
      type: "GET",
      url: '/appointments/',
      dataType: "JSON"
    }).done((data) => {
      this.setState({appointments: data.appointments});
    });
  }


  addNewAppointment = (data) => {
    const appointments = update(this.state.appointments, {$push: [data]})
    this.setState({appointments: appointments.sort(function(a,b) {
      return new Date(a.apt_time) - new Date(b.apt_time)
    })})
  }

  updateNewAppointment = (data) => {
    const appointmentIndex = this.state.appointments.findIndex( x => x.id === data.id )
    const appointments = update(this.state.appointments, {[appointmentIndex]: {$set: data}})
    this.setState({appointments: appointments.sort(function(a,b) {
      return new Date(a.apt_time) - new Date(b.apt_time)
    })})
  }

  deleteAppointementfromAppointments = (data) => {
    console.log(data)
    this.setState({appointments: data})
  }

  render () {
    return (
      <div>
        <AppointmentForm addNewAppointment={this.addNewAppointment} history={this.props.history} match={this.props.match} updateNewAppointment={this.updateNewAppointment} deleteAppointementfromAppointments={this.deleteAppointementfromAppointments} authenticity_token={this.props.authenticity_token}/>
        <AppointmentsContainer appointments={this.state.appointments} match={this.props.match} disabled={this.props.match.path === '/appointments/:id/edit'}/>
      </div>
    );
  }
}

export default Appointments

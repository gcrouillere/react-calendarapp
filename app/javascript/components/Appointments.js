import React from "react"
import PropTypes from "prop-types"
import Appointment from "./Appointment"
import AppointmentForm from "./AppointmentForm"
import AppointmentsContainer from "./AppointmentsContainer"
import update from 'immutability-helper'
import $ from 'jquery'
import moment from 'moment'

class Appointments extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      appointments: this.props.appointments,
      input_title: 'Team Meeting',
      input_apt_time: 'Tomorrow at 9am',
      authenticity_token: this.props.authenticity_token
    }
  }

  onListContainerInputChange = (inputHash) => {
    this.setState(inputHash)
  }

  onListContainerFormSubmit = () => {
    const  appointment = {title: this.state.input_title, apt_time: this.state.input_apt_time, authenticity_token: this.state.authenticity_token}
    $.post('/appointments/', {appointment: appointment, authenticity_token: this.props.authenticity_token})
    .done((data) => {this.addNewAppointment(data)})
  }

  addNewAppointment = (data) => {
    const appointments = update(this.state.appointments, {$push: [data]})
    this.setState({appointments: appointments.sort(function(a,b) {
      return new Date(a.apt_time) - new Date(b.apt_time)
    })})
  }

  render () {
    return (
      <React.Fragment>
        <AppointmentForm input_title={this.state.input_title} input_apt_time={this.state.input_apt_time}
        onListContainerInputChange={this.onListContainerInputChange} onListContainerFormSubmit={this.onListContainerFormSubmit}/>
        <AppointmentsContainer appointments={this.state.appointments}/>
      </React.Fragment>
    );
  }
}

Appointments.propTypes = {
  input_title: PropTypes.string,
  input_apt_time: PropTypes.string,
  token: PropTypes.string
};

export default Appointments

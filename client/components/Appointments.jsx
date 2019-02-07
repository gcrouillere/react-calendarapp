import React from "react"
import PropTypes from "prop-types"
import Appointment from "./Appointment"
import AppointmentForm from "./AppointmentForm"
import AppointmentsContainer from "./AppointmentsContainer"
import FormErrors from "./FormErrors"
import update from 'immutability-helper'
import $ from 'jquery'
import moment from 'moment'

class Appointments extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      appointments: this.props.appointments,
      title: {value:'', valid: false},
      apt_time: {value:'', valid: false},
      authenticity_token: this.props.authenticity_token,
      formErrors: {},
      formValid: false
    }
  }

  onListContainerInputChange = (fieldName, fieldValue, validations) => {
    const newFieldState = update(this.state[fieldName], {value: {$set: fieldValue}});
    this.setState({[fieldName]: newFieldState}, () => { this.validateField(fieldName, fieldValue, validations) });
  }

  validateField(fieldName, fieldValue, validations) {
    let fieldValid;
    let fieldErrors = validations.reduce((errors, validation) => {
      let error = validation(fieldValue)
      if (error !== "") {errors.push(error)}
        return (errors)
    }, [])

    fieldValid = fieldErrors.length === 0

    const newFieldState = update(this.state[fieldName], {valid: {$set: fieldValid}})
    const newFormErrors = update(this.state.formErrors, {[fieldName]: {$set: fieldErrors}})
    this.setState({[fieldName]: newFieldState, formErrors: newFormErrors}, this.validateForm)
  }

  validateForm() {
    this.setState({formValid: this.state.title.valid && this.state.apt_time.valid})
  }

  onListContainerFormSubmit = () => {
    const  appointment = {title: this.state.title.value, apt_time: this.state.apt_time.value, authenticity_token: this.state.authenticity_token}
    $.post('/appointments/', {appointment: appointment, authenticity_token: this.props.authenticity_token})
    .done((data) => {
      this.addNewAppointment(data)
      this.setState({formErrors: {}})
    })
    .fail((response) => {
      this.setState({formErrors: response.responseJSON})
    })
  }

  addNewAppointment = (data) => {
    const appointments = update(this.state.appointments, {$push: [data]})
    this.setState({appointments: appointments.sort(function(a,b) {
      return new Date(a.apt_time) - new Date(b.apt_time)
    })})
  }

  render () {
    return (
      <div>
        <FormErrors formErrors={this.state.formErrors}/>
        <AppointmentForm title={this.state.title} apt_time={this.state.apt_time}
        onListContainerInputChange={this.onListContainerInputChange} onListContainerFormSubmit={this.onListContainerFormSubmit}
        formValid = {this.state.formValid}/>
        <AppointmentsContainer appointments={this.state.appointments}/>
      </div>
    );
  }
}

Appointments.propTypes = {
  title: PropTypes.string,
  apt_time: PropTypes.string,
  authenticity_token: PropTypes.string
};

export default Appointments

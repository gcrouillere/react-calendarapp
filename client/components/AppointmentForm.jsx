import React from "react"
import PropTypes from "prop-types"
import DateTime from 'react-datetime'
import FormErrors from "./FormErrors"
import moment from 'moment'
import update from 'immutability-helper'
import $ from 'jquery'
import { validations } from '../utils/validations';

class AppointmentForm extends React.Component {

  static propTypes = {

  }

  static formValidations = {
    title: [
      (s) => { return(validations.checkMinLength(s, 3)) }
    ],
    apt_time: [
      (t) => { return(validations.timeShouldBeInTheFuture(t))}
    ]
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props)
    this.state = {
      title: {value: '', valid: false},
      apt_time: {value: '', valid: false},
      formErrors: {},
      formValid: false,
      editing: false
    }
  }

  componentDidMount () {
    if(this.props.match.path !== '/') {
      $.ajax({
        type: "GET",
        url: `/appointments/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done((data) => {
        this.setState({title: {value: data.title, valid: true},
                       apt_time: {value: data.apt_time, valid: true},
                       editing: this.props.match.path === '/appointments/:id/edit'
        });
      });
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

  handleSubmit = (e) => {
    e.preventDefault();
    const appointment = {title: this.state.title.value, apt_time: this.state.apt_time.value}
    this.state.editing ? this.updateAppointment(appointment) : this.addAppointment(appointment)
  }

  addAppointment = (appointment) => {
    $.post('/appointments/', {appointment: appointment, authenticity_token: this.props.authenticity_token})
    .done((data) => {
      this.props.addNewAppointment(data)
      this.setState({formErrors: {}})
    })
    .fail((response) => {
      this.setState({formErrors: response.responseJSON})
    })
  }

  updateAppointment = (appointment) => {
    $.ajax({
      type: "PATCH",
      url: `/appointments/${this.props.match.params.id}`,
      dataType: "JSON",
      data: {
        appointment: appointment,
        authenticity_token: this.props.authenticity_token
      }
    })
    .done((data) => {
      this.props.updateNewAppointment(data)
      this.setState({formErrors: {}})
    })
    .fail((response) => {
      this.setState({formErrors: response.responseJSON, formValid: false})
    })
  }

  handleInputChange = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    this.onListContainerInputChange(fieldName, fieldValue, AppointmentForm.formValidations[fieldName])
  }


  setAppointment = (e) => {
    const fieldName = 'apt_time';
    const fieldValue = e.toDate();
    this.onListContainerInputChange(fieldName, fieldValue, AppointmentForm.formValidations[fieldName])
  }

  deleteAppointement = () => {
    $.ajax({
      type: "DELETE",
      url: `/appointments/${this.props.match.params.id}`,
      dataType: "JSON",
      data: {authenticity_token: this.props.authenticity_token}
    }).done((data) => {
      this.props.history.push('/')
      this.setState({formErrors: {}})
    }).fail((response) => {
      console.log('appointment deleting failed!');
    })
  }

  render () {
    var inputProps = {
      name: 'apt_time'
    }

    return (
      <div className="apt-form-with-title">
        <h2>{this.state.editing ? 'Update appointment' : 'Make a new appointment' }
         </h2>
        <FormErrors formErrors={this.state.formErrors}/>
        <form action="" onSubmit={this.handleSubmit} className="apt-form">
          <input type="text" name="title" placeholder="Appointment Title" value={this.state.title.value} onChange={this.handleInputChange}/>
          <DateTime input={false} open={true} inputProps={inputProps} value={moment(this.state.apt_time.value)} onChange={this.setAppointment} />
          <input type="hidden" name="authenticity_token" id="authenticity_token" value={this.props.authenticity_token}/>
          <input type="submit" value={this.state.editing ? 'Update appointment' : 'New appointment' } className="apt-submit-button" disabled={!this.state.formValid}/>
        </form>
        {this.state.editing && (
          <div><button onClick={this.deleteAppointement}>Delete Appointment</button></div>
        )}
      </div>
    );
  }
}

export default AppointmentForm


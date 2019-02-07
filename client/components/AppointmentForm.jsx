import React from "react"
import PropTypes from "prop-types"
import DateTime from 'react-datetime'
import FormLabel from './FormLabel'
import moment from 'moment'
import { validations } from '../utils/validations';

class AppointmentForm extends React.Component {

  static formValidations = {
    title: [
      (s) => { return(validations.checkMinLength(s, 3)) }
    ],
    apt_time: [
      (t) => { return(validations.timeShouldBeInTheFuture(t))}
    ]
  }

  handleInputChange = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    this.props.onListContainerInputChange(fieldName, fieldValue, AppointmentForm.formValidations[fieldName])
}

  onAppointementFormSubmit = (e) => {
    e.preventDefault();
    this.props.onListContainerFormSubmit()
  }

  setAppointment = (e) => {
    const fieldName = 'apt_time';
    const fieldValue = e.toDate();
    this.props.onListContainerInputChange(fieldName, fieldValue, AppointmentForm.formValidations[fieldName])
  }

  render () {
    var inputProps = {
      name: 'apt_time'
    }

    return (
      <React.Fragment>
          <FormLabel label={'Make a new appointment'}/>
          <form action="" onSubmit={this.onAppointementFormSubmit} className="apt-form">
            <input type="text" name="title" placeholder="Appointment Title" value={this.props.title.value} onChange={this.handleInputChange}/>
            <DateTime input={false} open={true} inputProps={inputProps} value={moment(this.props.apt_time.value)} onChange={this.setAppointment} />
            <input type="hidden" name="authenticity_token" id="authenticity_token" value={this.props.authenticity_token}/>
            <input type="submit" value="Make appointment" className="apt-submit-button" disabled={!this.props.formValid}/>
          </form>
      </React.Fragment>
    );
  }
}

export default AppointmentForm

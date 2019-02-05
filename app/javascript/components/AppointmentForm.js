import React from "react"
import PropTypes from "prop-types"
import DateTime from 'react-datetime'
import FormLabel from './FormLabel'

class AppointmentForm extends React.Component {

  handleInputChange = (e) => {this.props.onListContainerInputChange({[e.target.name]: e.target.value})}

  onAppointementFormSubmit = (e) => {
    e.preventDefault();
    this.props.onListContainerFormSubmit()
  }

  setAppointment = (e) => {this.props.onListContainerInputChange( {['input_apt_time']: e.toDate()})}

  render () {
    var inputProps = {
      name: 'input_apt_time'
    }

    return (
      <React.Fragment>
          <FormLabel label={'Make a new appointment'}/>
          <form action="" onSubmit={this.onAppointementFormSubmit} className="apt-form">
            <input type="text" name="input_title" placeholder="Appointment Title" value={this.props.input_title} onChange={this.handleInputChange}/>
            <DateTime input={false} open={true} inputProps={inputProps} value={this.props.input_apt_time} onChange={this.setAppointment} />
            <input type="hidden" name="authenticity_token" id="authenticity_token" value={this.props.authenticity_token}/>
            <input type="submit" value="Make appointment" className="apt-submit-button"/>
          </form>
      </React.Fragment>
    );
  }
}

export default AppointmentForm

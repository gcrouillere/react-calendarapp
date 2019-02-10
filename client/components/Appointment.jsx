import React from "react"
import PropTypes from "prop-types"
import moment from 'moment'
import { Link } from 'react-router-dom'
import $ from 'jquery'

class Appointment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appointment: this.props.appointment
    }
  }

  static propTypes = {
    appointment: PropTypes.object.isRequired
  }

  static defaultProps = {
    appointment: {}
  }

  componentDidMount () {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: `/appointments/${this.props.match.params.id}`,
        dataType: "JSON"
      }).done((data) => {
        this.setState({appointment: data});
      });
    }
  }

  render () {
    return(
      <div className="appointment">
        <Link to={`/appointments/${this.state.appointment.id}`}>
          <h3>{this.state.appointment.title}</h3>
        </Link>
        <p>{this.state.appointment.apt_time ? moment(this.state.appointment.apt_time).format('MMMM DD YY, h:mm:ss a') : ""}</p>
        <Link to={`/appointments/${this.state.appointment.id}/edit`}>
          Edit Appointment
        </Link>
      </div>
    )
  }
}

export default Appointment

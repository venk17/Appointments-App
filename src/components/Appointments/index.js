import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    Appointmentlist: [],
    title: '',
    date: '',
    showStarred: false,
  }

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addDate = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {Appointmentlist, title, date} = this.state

    if (title && date) {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isStarred: false,
      }

      this.setState({
        Appointmentlist: [...Appointmentlist, newAppointment],
        title: '',
        date: '',
      })
    }
  }

  toggleStarStatus = id => {
    this.setState(prevState => ({
      Appointmentlist: prevState.Appointmentlist.map(appointment =>
        appointment.id === id
          ? {...appointment, isStarred: !appointment.isStarred}
          : appointment,
      ),
    }))
  }

  toggleShowStarred = () => {
    this.setState(prevState => ({showStarred: !prevState.showStarred}))
  }

  render() {
    const {Appointmentlist, title, date, showStarred} = this.state
    const filteredAppointments = showStarred
      ? Appointmentlist.filter(appointment => appointment.isStarred)
      : Appointmentlist

    return (
      <div className="bg_container">
        <div className="appointment_container">
          <div className="top_section">
            <form className="form_section" onSubmit={this.addAppointment}>
              <h1 className="form_heading">Add Appointment</h1>
              <label htmlFor="form_title">TITLE</label>
              <br />
              <input
                id="form_title"
                type="text"
                placeholder="Title"
                onChange={this.addTitle}
                value={title}
              />
              <br />
              <label htmlFor="form_date">DATE</label>
              <br />
              <input
                id="form_date"
                type="date"
                onChange={this.addDate}
                value={date}
              />
              <br />
              <button className="add_button" type="submit">
                Add
              </button>
            </form>
            <div className="img_section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="top_section_img"
              />
            </div>
          </div>
          <hr className="middle_section" />
          <div className="bottom_section">
            <div className="button_section_top">
              <h1 className="bottom_heading">Appointments</h1>
              <button
                className={`bottom_section_button ${
                  showStarred ? 'active' : ''
                }`}
                type="button"
                onClick={this.toggleShowStarred}
              >
                Starred
              </button>
            </div>
            <ul className="appointment_list">
              {filteredAppointments.map(appointment => (
                <AppointmentItem
                  key={appointment.id}
                  {...appointment}
                  toggleStarStatus={this.toggleStarStatus}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

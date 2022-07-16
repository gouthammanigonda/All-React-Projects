// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleIp: '',
    dateIp: '',
    isFiltered: false,
  }

  onFilter = () => {
    const {isFiltered} = this.state
    this.setState({
      isFiltered: !isFiltered,
    })
  }

  onAddAppointment = event => {
    const {appointmentsList, titleIp, dateIp, isFiltered} = this.state
    event.preventDefault()
    const formattedDate = dateIp
      ? format(new Date(dateIp), 'dd MMMM yyyy, EEEE')
      : ''
    if (titleIp !== '' && dateIp !== '') {
      const newAppointment = {
        id: v4(),
        title: titleIp,
        date: formattedDate,
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleIp: '',
        dateIp: '',
      }))
    }
  }

  toggleisStared = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onChangeOfTitle = event => {
    this.setState({titleIp: event.target.value})
  }

  changeDate = event => {
    this.setState({dateIp: event.target.value})
  }

  getFilteredList = () => {
    const {appointmentsList, isFiltered} = this.state
    if (isFiltered === true) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {titleIp, dateIp, isFiltered} = this.state
    const filteredResults = this.getFilteredList()

    return (
      <div className="container1">
        <div className="container2">
          <div className="container3">
            <div className="container4">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1>Add Appointment</h1>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={titleIp}
                  placeholder="Title"
                  onChange={this.onChangeOfTitle}
                />
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  value={dateIp}
                  type="date"
                  onChange={this.changeDate}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
              <div>
                <img
                  className="appointmentsimg"
                  src=" https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                />
              </div>
            </div>
            <hr className="hrline" />
            <div className="container5">
              <h1>Appointments</h1>
              <div>
                <button
                  className="button2"
                  type="button"
                  onClick={this.onFilter}
                >
                  {!isFiltered ? 'Stared' : 'Unstared'}
                </button>
              </div>
            </div>
            <ul className="unorderedlist">
              {filteredResults.map(each => (
                <AppointmentItem
                  key={each.id}
                  each={each}
                  toggleisStared={this.toggleisStared}
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

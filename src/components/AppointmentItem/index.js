import React from 'react'
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {id, title, date, isStarred, toggleStarStatus} = props

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment_item">
      <div className="appointment_item_top">
        <p className="appointment_title">{title}</p>
        <button
          className="appointment_item_button"
          type="button"
          onClick={() => toggleStarStatus(id)}
          data-testid="star"
        >
          <img alt="star" src={starImgUrl} />
        </button>
      </div>
      <p className="date_text">
        {format(new Date(date), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}

export default AppointmentItem

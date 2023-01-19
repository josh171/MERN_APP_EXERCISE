import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"

function CreateExercise() {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
  })
  const handleChange = (e) => {
    const {name, value} = e.target
    setExercise({
      ...exercise,
      [name]: value
    })
  }
  const handleDateChange = (e) => {
    console.log(e)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newExerciseEntry = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date
    }
    axios.post('http://localhost:5000/exercises/add', newExerciseEntry)
      .then(res => console.log(res.data))
    window.location = "/"
  }
  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setExercise({
            ...exercise,
            users: res.data.map(user => user.username),
            username: res.data[0].username
          })
        } 
      })
  }, [])
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select required className="form-control" name="username" value={exercise.username} onChange={handleChange}>
            {exercise.users.map(user => {
              return <option key={user} value={user}>{user}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text" name="description" className="form-control" value={exercise.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input type="text" name="duration" className="form-control" value={exercise.duration} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker selected={exercise.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
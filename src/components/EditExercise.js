import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"
import { useParams } from 'react-router-dom';

function EditExercise() {
  const {id} = useParams()
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
  const handleSubmit = (e) => {
    e.preventDefault()
    const newExerciseEntry = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date
    }
    axios.post('http://localhost:5000/exercises/update'+id, newExerciseEntry)
      .then(res => console.log(res.data))
    window.location = "/"
  }
  console.log(id)
  useEffect(() => {
    axios.get('http://localhost:5000/exercises/'+id)
      .then(res => {
        console.log(res.data.username)
        setExercise({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        })
      })
      .catch(err => console.log(err))
    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setExercise({
            ...exercise,
            users: res.data.map(user => user.username)
          })
        } 
      })
  }, [])
  console.log(exercise)
  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          {exercise.username}
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
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
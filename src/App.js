import "bootstrap/dist/css/bootstrap.min.css"
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import EditExercise from "./components/EditExercise";
import ExercisesList from "./components/ExercisesList";
import NavBar from "./components/NavBar"

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
        <Routes>
          <Route path="/" element={<ExercisesList />} />
          <Route path="/edit/:id" element={<EditExercise />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import "./Reactform.css"
function FormApp() {
  const initialvalue = {
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    gender: "",
    subjects: "",
    id: Math.floor(Math.random() * 1000),
  };

  const [person, setPerson] = useState(initialvalue);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getFromLocal = JSON.parse(localStorage.getItem('people'));
    setPeople(getFromLocal || []);
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson((prev) => ({ ...prev, [name]: value }));
  }

  function setinLocal() {
    localStorage.setItem("people", JSON.stringify(people));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { ...person, id: Math.floor(Math.random() * 1000) };
    console.log("Form Submitted successfully",person)

    setPeople((prev) => [...prev, newPerson]);
    setPerson(initialvalue);
    setinLocal();
  }

  const handleDelete = (id) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
    setinLocal();
  };

  return (
    <>
      <div className="App">
        <h1>REACT FORM</h1>
        <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column", padding: "5px", width: "400px" }}>
          {/* ... Rest of the form inputs ... */}

          <label htmlFor="firstName">First Name:</label>
  <input type="text" id="firstName" value={person.firstName} name="firstName" onChange={handleChange} placeholder="Enter your First Name" required/>

  <label htmlFor="lastName">Last Name:</label>
  <input type="text" id="lastName" value={person.lastName} name="lastName" onChange={handleChange} placeholder="Enter your Last Name" required />

  <label htmlFor="number">Mobile Number:</label>
  <input
    type="text"
    id="number"
    value={person.number}
    name="number"
    onChange={handleChange}
    placeholder="Enter your Phone Number"
    pattern="[0-9]{10}"
    title="Please enter a 10-digit number."
  />

  <label htmlFor="email">Email:</label>
  <input type="email" id="email" value={person.email} name="email" onChange={handleChange} placeholder="Enter your email" required />

  <label htmlFor="gender">Gender:</label>
  <input type="text" id="gender" value={person.gender} name="gender" onChange={handleChange} placeholder="Enter your gender" />

  <label htmlFor="subjects">Subjects:</label>
  <input type="text" id="subjects" value={person.subjects} name="subjects" onChange={handleChange} placeholder="Enter your subjects" />


          <button type="submit">Submit</button>
        </form>

        <div>
          <table>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Lastname</th>
                <th>email</th>
                <th>phone</th>
                <th>gender</th>
                <th>Subjects</th>
                <th>ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {people.map((val, index) => {
                return (
                  <tr key={val.id}>
                    <td>{index + 1}</td>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{val.email}</td>
                    <td>{val.number}</td>
                    <td>{val.gender}</td>
                    <td>{val.subjects}</td>
                    <td>{val.id}</td>
                    <td>
                      <button onClick={() => handleDelete(val.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FormApp;

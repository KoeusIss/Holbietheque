import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from "axios";

const Student = ({match}) => {
    let  {id} = useParams()
    const [student, setStudent] = useState({})

    useEffect(() => {
    const auth_header = localStorage.getItem("access_token");
    axios
      .get("http://localhost:5000/api/v1/students/" + id, {
        headers: { Authorization: `Bearer ${auth_header}` },
      })
      .then((response) => {
        setStudent(response.data.student);
      })
  });
    return (
        <div className="student">
            <h1>Student id: {id} here</h1>
            <h2>{student.first_name}</h2>
        </div>
    )
}
export default Student

import React, { useEffect, useState } from "react";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const auth_header = localStorage.getItem("access_token");
    axios
      .get("http://localhost:5000/api/v1/students", {
        headers: { Authorization: `Bearer ${auth_header}` },
      })
      .then((response) => {
        setStudents(response.data.students);
      });
  });
  return (
    <div>
      <h1>Students List:</h1>
      <ul>
        {students.map((item) => {
          return (
            <li key={item.id}>
              <div>
                {item.first_name} {item.last_name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Students;

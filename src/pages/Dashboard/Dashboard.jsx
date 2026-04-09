import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend Data:", data);
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>

      {projects.length === 0 ? (
        <p>No Projects Available</p>
      ) : (
        projects.map((project, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "10px",
            }}
          >
            <h3>{project.title}</h3>
            <p>{project.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
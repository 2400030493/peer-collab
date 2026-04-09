import React, { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setProjects(data);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Projects (From Backend)</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((p, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <h3>{p.title}</h3>
            <p>{p.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Projects;
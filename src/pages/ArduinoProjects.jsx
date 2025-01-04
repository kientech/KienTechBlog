import React, { useEffect, useState } from "react";
import axios from "axios";

function ArduinoProjects() {
  const [data, setData] = useState([]);
  console.log("🚀 ~ ArduinoProjects ~ data:", data);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://script.google.com/macros/s/AKfycbzGrixqi4QTmYE0z9cwP3Teq6TWR-fvNdA-6_2lCcl2eyuRJ7IS2h8jp6DqNwbDzgxlEw/exec"
        );
        setData(response.data); 
      } catch (err) {
        setError(err.message); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {error && <p className="text-red-500">Error: {error}</p>}
      {data.slice(3).map((project, index) => (
        <div key={index} className="p-4 bg-white shadow rounded border">
          <img
            src={project.thumbnail}
            alt=""
            className="w-full h-48 object-cover"
          />
          <h2 className="text-xl font-bold">{project.name}</h2>
          <p>{project.shortDescription}</p>
          <p>
            <strong>Microcontroller:</strong> {project.microcontroller}
          </p>
          <p>
            <strong>Hardware:</strong> {project.hardware}
          </p>
          <p>
            <strong>Software:</strong> {project.software}
          </p>
          <p>
            <strong>Youtube URL:</strong> {project.youtubeURL}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ArduinoProjects;

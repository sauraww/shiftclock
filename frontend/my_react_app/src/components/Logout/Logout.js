// src/components/Logout.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { updateTimestamps } from "../api/api";

const Logout = ({ loggedInEmployeeId, setLoggedInEmployeeId }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logoutTimestamp = new Date().toISOString();
    console.log("loggedInEmployeeId:", loggedInEmployeeId);
  
    if (loggedInEmployeeId) {
      try {
        // Use loggedInEmployeeId directly as employeeId
        const employeeId = loggedInEmployeeId;
  
        console.log("Before updateTimestamps");
        const response = await updateTimestamps(employeeId, null, logoutTimestamp);
        console.log("Update Timestamps response:", response);
        setLoggedInEmployeeId(null);
        navigate("/login");
      } catch (error) {
        console.error("Error updating logout timestamp:", error);
      }
    } else {
      console.error("loggedInEmployeeId is not valid:", loggedInEmployeeId);
    }
  };
  
  
  
  

  return (
    <div>
      <h2 className="text-white">Logout</h2>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;

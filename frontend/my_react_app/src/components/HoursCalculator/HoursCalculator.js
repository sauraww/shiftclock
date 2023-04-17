import React, { useState, useEffect } from "react";
import { fetchEmployee } from "../api/api";

const HoursCalculator = ({ loggedInEmployeeId }) => {
  const [hours, setHours] = useState(0);

  useEffect(() => {
    async function calculateHours() {
      const employee = await fetchEmployee(loggedInEmployeeId);
      const loginTimestamp = new Date(employee.login_timestamp);
      const logoutTimestamp = new Date(employee.logout_timestamp);
      const diff = logoutTimestamp - loginTimestamp;
      const calculatedHours = diff / 1000 / 60 / 60; // Convert milliseconds to hours
      setHours(calculatedHours);
    }

    if (loggedInEmployeeId) {
      calculateHours();
    }
  }, [loggedInEmployeeId]);

  return (
    <div>
      <h3>Hours Worked</h3>
      <p>{hours.toFixed(2)}</p>
    </div>
  );
};

export default HoursCalculator;

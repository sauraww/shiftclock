import React, { useState, useEffect, useCallback } from "react";
import NavigationBar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./HomePage";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Timesheets from "./components/Timesheet/Timesheets";
import ManagerApproval from "./components/ManagerApproval/ManagerApproval";
import Logout from "./components/Logout/Logout";
import { fetchTimesheets, createTimesheetEntry } from "./components/api/api";

function AppContent({ isAuthenticated, setIsAuthenticated, loggedInEmployeeId, setLoggedInEmployeeId, timesheets, setTimesheets, refreshTimesheets }) {
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      refreshTimesheets(loggedInEmployeeId);
    }
  }, [location, isAuthenticated, loggedInEmployeeId, refreshTimesheets]);

  const handleLogin = (employeeId) => {
    setLoggedInEmployeeId(employeeId);
    setIsAuthenticated(true);
  };

  const handleManualEntry = async (employeeId, date, hours) => {
    try {
      const response = await createTimesheetEntry(employeeId, date, hours);
      console.log("Manual entry added:", response);
      refreshTimesheets(employeeId);
    } catch (error) {
      console.error("Error adding manual entry:", error);
    }
  };

  return (
    <div className="App">
      <NavigationBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/timesheet"
          element={
            isAuthenticated ? (
              <Timesheets
                loggedInEmployeeId={loggedInEmployeeId}
                timesheets={timesheets}
                setTimesheets={setTimesheets}
                refreshTimesheets={refreshTimesheets}
                handleManualEntry={handleManualEntry}
              />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/logout"
          element={
            isAuthenticated ? (
              <Logout
                loggedInEmployeeId={loggedInEmployeeId}
                setLoggedInEmployeeId={setLoggedInEmployeeId}
              />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/manager-approval"
          element={
            isAuthenticated ? (
              <ManagerApproval />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInEmployeeId, setLoggedInEmployeeId] = useState(null);
  const [timesheets, setTimesheets] = useState([]);

  const refreshTimesheets = useCallback(async (employeeId) => {
    try {
      const response = await fetchTimesheets(employeeId);
      if (response) {
        setTimesheets(Array.isArray(response) ? response : []);
        console.log("Timesheets updated:", response);
      } else {
        setTimesheets([]);
      }
    } catch (error) {
      console.error("Error fetching timesheets:", error);
    }
  }, []);

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        loggedInEmployeeId={loggedInEmployeeId}
        setLoggedInEmployeeId={setLoggedInEmployeeId}
        timesheets={timesheets}
        setTimesheets={setTimesheets}
        refreshTimesheets={refreshTimesheets}
      />
    </Router>
  );
}

export default App;


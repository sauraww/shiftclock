import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { createTimesheetEntry } from "../api/api";
import { DownloadTimesheet } from "./DownloadTimeSheetButton";
import "./Timesheets.css";

const Timesheets = ({ loggedInEmployeeId }) => {
  const [manualDate, setManualDate] = useState("");
  const [manualHours, setManualHours] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const getTimesheets = async () => {
      try {
        const response = await fetch(`/api/employees/${loggedInEmployeeId}/timesheets`);
        const data = await response.json();
        setTimesheets(data.timesheets);
      } catch (error) {
        console.error("Error fetching timesheets:", error);
      }
    };

    if (loggedInEmployeeId) {
      getTimesheets();
    }
  }, [loggedInEmployeeId]);

  const validateForm = () => {
    return manualDate && parseFloat(manualHours) > 0;
  };

  const handleManualEntry = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const newTimesheet = await createTimesheetEntry(loggedInEmployeeId, manualDate, manualHours);
      setTimesheets([...timesheets, newTimesheet]); // Update timesheets state with new entry
      setManualDate("");
      setManualHours("");
    } catch (error) {
      console.error("Error adding manual entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="timesheets-container">
      <h2 className="text-white" >Timesheets</h2>
      <div className="form-container">
        <div style={{ textAlign: "center" }}>
          <Form onSubmit={handleManualEntry}>
            <Form.Group controlId="manualDate">
              <Form.Label className="text-white">Date</Form.Label>
              <Form.Control
                type="date"
                value={manualDate}
                onChange={(e) => setManualDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="manualHours">
              <Form.Label className="text-white">Hours</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={manualHours}
                onChange={(e) => setManualHours(e.target.value)}
                required
                min="0.01"
              />
            </Form.Group>
            <Button variant="primary" className="mt-3"  type="submit" disabled={!validateForm() || isSubmitting}>
              Add Manual Entry
            </Button>
          </Form>
        </div>
      </div>
      <div className="download-button-container">
        <DownloadTimesheet loggedInEmployeeId={loggedInEmployeeId} timesheets={timesheets} />
      </div>
    </div>
  );
};

export default Timesheets;

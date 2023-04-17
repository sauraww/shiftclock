import React from "react";
import { Button } from "react-bootstrap";

const API_URL = 'http://localhost:8000';

const DownloadTimesheet  = ({ loggedInEmployeeId }) => {
    const handleDownload = async () => {
        try {
          const url = `${API_URL}/timesheets/${loggedInEmployeeId}/download`;
          const response = await fetch(url);
          const blob = await response.blob();
          const filename = `timesheet-${loggedInEmployeeId}.csv`;
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error("Error downloading timesheet:", error);
        }
      };

  return (
    <Button variant="primary" onClick={handleDownload}>
      Download Timesheet
    </Button>
  );
};

export { DownloadTimesheet };


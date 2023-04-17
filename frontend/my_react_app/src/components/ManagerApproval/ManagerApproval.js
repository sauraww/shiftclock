import React, { useState } from 'react';
import { createManagerApproval } from '../api/api';
import './ManagerApproval.css';

function ManagerApproval() {
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createManagerApproval(username, date, status);
      alert('Manager approval added successfully');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="manager-approval-container">
      <h2 className="manager-approval-header" >Manager Approval</h2>
      <form className="manager-approval-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date:</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Approval:</label>
          <select
  className="form-control"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  required
>
  <option value="">Select approval status</option>
  <option value="Approved">Approve</option>
  <option value="Rejected">Reject</option>
</select>

        </div>
        <button type="submit" className="btn btn-primary">Submit Approval</button>
      </form>
    </div>
  );
}

export default ManagerApproval;


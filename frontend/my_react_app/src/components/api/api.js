const API_URL = 'https://shift-clock.vercel.app'; // Replace with your backend server URL

async function request(url, options) {
  const requestOptions = {
    ...options,
    credentials: 'include', // Add this line
  };
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

export async function register(username, password) {
  const data = { username, password };
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return request(`${API_URL}/register/`, requestOptions);
}

export async function loginUser(username, password) {
  const data = { username, password };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return request(`${API_URL}/login/`, requestOptions);
}

export async function updateTimestamps(employee_id, login, logout) {
  const data = { employee_id, login, logout };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return request(`${API_URL}/update-timestamps/`, requestOptions);
}


export async function getEmployee(employee_id) {
  return request(`${API_URL}/employee/${employee_id}`);
}

export async function fetchEmployee(employeeId) {
  const url = `${API_URL}/employee/${employeeId}/`;
  const response = await request(url);
  return response;
}  

export async function createTimesheetEntry(employee_id, date, hours) {
  const data = { employee_id, date, hours: parseFloat(hours) };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${API_URL}/timesheet/`, requestOptions);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${errorText}`);
  }
  const jsonResponse = await response.json();
  console.log("API response:", jsonResponse);
  return jsonResponse;
}




// api.js
export async function createManagerApproval(username, date, status) {
  const data = { username, date, status };
  console.log(data)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  console.log('API URL:', `${API_URL}/manager-approval/`); // Add this line
  return request(`${API_URL}/manager-approval/`, requestOptions);
}



// api.js
export async function fetchTimesheets(employeeId) {
  const url = `${API_URL}/timesheets/${employeeId}/`;
  const response = await request(url);
  return response;
}


// ... other exports


# Excel Processor React App

A React-based web application that allows users to upload an Excel file, perform predefined operations on the file, and dynamically display the updated data in a table format.

## Features

1. **File Upload Interface**: Allows users to upload Excel files.
2. **Dynamic Table Display**: Displays uploaded Excel data in a table format that updates dynamically.
3. **Operation Prompts**: Users can perform operations like:
   - Add a new column (e.g., `Total = Price + Tax`).
   - Filter rows (e.g., `Income > 5000`).
   - Combine columns (e.g., `First Name + Last Name = Full Name`).
4. **Reusable Components**: Modular design for file upload, table display, and operation prompts.
5. **Simulated Backend**: Mock API to process file uploads and operations.

## Technologies Used

- **Frontend**: React, React Hooks, Material-UI / React Table
- **Backend**: JSON Server or Node.js with Express (mock API)
- **File Parsing**: `xlsx` library
- **HTTP Requests**: Axios or Fetch API

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd excel-processor
   ```

2. Install dependencies:

   ```bash
   nvm use
   npm install
   ```

3. Start the mock backend:

   ```bash
   npm run dev
   ```

4. Access the application at `http://localhost:3000`.

5. Reference for Material React Table: `https://www.material-react-table.com/docs/api/table-options`

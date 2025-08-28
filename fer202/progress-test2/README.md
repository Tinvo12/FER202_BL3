# Mobile Store React Application


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   npm i react-router-dom axios bootstrap react-bootstrap react-icons prop-types

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. In a separate terminal, start the JSON server:
   ```bash
   npx json-server --watch db.json --port 3001
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

- **Email**: admin@example.com
- **Password**: password123

## Technologies Used

- **React 19** - Frontend framework
- **React Router** - Client-side routing
- **React Bootstrap** - UI component library
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **JSON Server** - Mock API server

## API Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get specific product
- `GET /users` - Get users for authentication


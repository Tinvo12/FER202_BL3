# Person Management System

A React application that demonstrates various JavaScript array methods and React concepts including filter, reduce, destructuring, and component-based architecture.

## Features

### 1. Person List with Sorting
- Displays a list of persons with their full name, age, city, and skills
- Sort button to toggle between A→Z and Z→A sorting by first name
- Responsive design using Bootstrap

### 2. Filter by Age and Skills
- Filter persons by age range (min-max)
- Filter by specific skills using a dropdown
- Uses `filter`, `reduce`, and destructuring
- Shows results as "FirstName - LastName - Skills" format
- Displays "No found" when no results match

### 3. Skill Ranking Table
- Calculates frequency of each skill using `reduce`
- Displays skills in a table format with counts
- Top skill is highlighted in bold
- Sorted by frequency (highest first)

### 4. Search and Multi-Criteria Sort
- Search functionality by first name or last name
- Multi-criteria sorting:
  1. Active status (active first)
  2. Age (ascending)
  3. Last name (A→Z)
- Statistics box showing:
  - Total people
  - Average age
  - Number of active people
- Uses `reduce` for statistics calculation

## Technical Implementation

### React Concepts Used
- Functional components with hooks
- `useState` for state management
- `useMemo` for performance optimization
- Component composition
- Props and state management

### JavaScript Array Methods
- `filter()` - for filtering data
- `reduce()` - for aggregating data and counting
- `sort()` - for sorting data
- `map()` - for rendering lists
- Destructuring - for extracting object properties

### Bootstrap Integration
- Responsive grid system
- Cards for component containers
- Form controls and buttons
- Tables and lists
- Alerts and badges

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── PersonList.js      # Requirement 1: List with sorting
│   ├── PersonFilter.js    # Requirement 2: Age and skill filtering
│   ├── SkillRanking.js    # Requirement 3: Skill frequency table
│   └── PersonSearch.js    # Requirement 4: Search and multi-sort
├── person.js              # Data source
├── App.js                 # Main application component
└── App.css               # Application styles
```

## Data Structure

Each person object contains:
- `id`: Unique identifier
- `firstName`: First name
- `lastName`: Last name
- `age`: Age in years
- `city`: City of residence
- `skills`: Array of skills
- `isActive`: Boolean indicating active status

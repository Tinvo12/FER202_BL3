# Company List Application with React Bootstrap

A modern React application that displays a list of companies with search, filtering, and sorting capabilities using React Bootstrap.

## Features

### 🔍 **Search Functionality**
- Real-time search by company name
- Search button and Enter key support
- Instant filtering as you type

### 📊 **Sorting Options**
- **Name (A-Z)**: Alphabetical sorting
- **Year (Ascending)**: Sort by start year ascending
- **Year (Descending)**: Sort by start year descending
- **Start-End Range**: Sort by company duration

### 🏷️ **Category Filtering**
- Filter companies by category (Finance, Retail, Auto, Technology)
- "All Categories" option to show all companies
- Dynamic category list from available data

### 📱 **Responsive Design**
- Mobile-friendly interface
- Bootstrap responsive grid system
- Beautiful gradient background
- Modern card-based layout

### 🎨 **UI/UX Features**
- Bootstrap components for consistent design
- Hover effects and smooth transitions
- Color-coded badges for categories and duration
- Professional table styling with striped rows
- Alert messages for user feedback

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd slot3-ex1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Dependencies

- **React**: ^19.1.1
- **React Bootstrap**: ^2.10.1
- **Bootstrap**: ^5.3.2

## Project Structure

```
src/
├── App.js                 # Main application component
├── App.css               # Custom styles
└── components/
    ├── SearchBar.js      # Search functionality
    ├── FilterControls.js # Sorting and filtering
    ├── CompanyTable.js   # Table display
    └── ResultsInfo.js    # Results count
```

## Components

### App.js
- Main container with state management
- Uses React Bootstrap Container, Row, Col, Card
- Handles filtering and sorting logic
- Manages all application state

### SearchBar
- InputGroup with Form.Control and Button
- Real-time search functionality
- Enter key support

### FilterControls
- Form.Select components for sorting and filtering
- Responsive grid layout
- Clear labels and organized structure

### CompanyTable
- Bootstrap Table with striped, bordered, hover effects
- Responsive table wrapper
- Badge components for categories and duration
- Alert component for "no results" state

### ResultsInfo
- Bootstrap Alert component
- Shows count of filtered results
- Info variant styling

## Usage

1. **Search**: Type in the search box to filter companies by name
2. **Sort**: Use the "Sort By" dropdown to change the order of results
3. **Filter**: Select a category from the "Category Filter" dropdown
4. **View**: Results are displayed in a responsive table with company details

## Styling

The application uses a combination of:
- **Bootstrap 5** for responsive grid and components
- **React Bootstrap** for React-specific components
- **Custom CSS** for gradient backgrounds and animations
- **Bootstrap utilities** for spacing and typography

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

To modify the application:

1. **Add new companies**: Edit the `companies` array in `App.js`
2. **Change styling**: Modify `App.css` for custom styles
3. **Add features**: Extend components in the `components/` folder
4. **Update Bootstrap theme**: Override Bootstrap variables in CSS

## License

This project is licensed under the ISC License.

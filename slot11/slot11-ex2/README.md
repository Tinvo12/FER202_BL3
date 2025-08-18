# Student Management System

A comprehensive React application for managing student information with advanced filtering, sorting, and search capabilities.

## Features

### 🎯 Core Functionality
- **Student Data Management**: Display 10 students with id, name, email, age, and avatar
- **Advanced Filtering**: Search by name/email, filter by age range, and avatar availability
- **Sorting Options**: Sort by age (ascending/descending) and name (A-Z/Z-A)
- **Responsive Design**: 3 columns on desktop, 2 on tablet, 1 on mobile

### 🎨 User Interface
- **Navigation Bar**: Links to Home, Students, About + Quick search functionality
- **Hero Section**: Attractive title and description
- **Filter Panel**: Comprehensive filtering options with real-time updates
- **Student Grid**: Card-based layout with hover effects
- **Detail Modal**: Detailed student information in a modal popup
- **Footer**: Contact information and quick links

### 🔧 Technical Implementation
- **React Hooks**: useState for state management, useMemo for performance optimization
- **PropTypes**: Type checking for all components
- **Bootstrap**: Responsive UI framework with custom styling
- **React Icons**: Beautiful iconography throughout the interface
- **Component Architecture**: Modular, reusable components

## Components Structure

```
src/
├── components/
│   ├── Navbar.js              # Navigation with quick search
│   ├── Hero.js                # Hero section with title
│   ├── Filters.js             # Search and filter controls
│   ├── SortDropdown.js        # Sorting options
│   ├── StudentCard.js         # Individual student card
│   ├── StudentGrid.js         # Responsive grid layout
│   ├── StudentDetailModal.js  # Student details modal
│   ├── StudentsPage.js        # Main page component
│   └── Footer.js              # Footer component
├── data/
│   └── students.js            # Student data (10 students)
└── App.js                     # Main application component
```

## Student Data Structure

Each student object contains:
```javascript
{
  id: number,           // Unique identifier
  name: string,         // Student name
  email: string,        // Email address
  age: number,          // Age in years
  avatar: string        // Avatar image URL
}
```

## Filtering Options

### Age Ranges
- ≤ 20 years
- 21 - 25 years  
- > 25 years

### Search
- Search by student name
- Search by email address
- Real-time filtering

### Avatar Filter
- Show only students with avatars

## Sorting Options

- **Age**: Youngest first / Oldest first
- **Name**: A → Z / Z → A
- **No Sorting**: Original order

## Responsive Design

- **Desktop**: 3 columns
- **Tablet**: 2 columns  
- **Mobile**: 1 column

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

## Technologies Used

- **React 19.1.1**: Modern React with hooks
- **Bootstrap 5.3.7**: Responsive UI framework
- **React Bootstrap 2.10.10**: Bootstrap components for React
- **React Icons 5.5.0**: Icon library
- **PropTypes**: Type checking

## Performance Features

- **useMemo**: Optimized filtering and sorting
- **Lazy Loading**: Efficient component rendering
- **Image Fallbacks**: Graceful handling of missing images
- **Responsive Images**: Optimized for different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes as part of the FER202_BL3 course.

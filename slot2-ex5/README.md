# Exercise 4: JSX and ES6

This React application implements all the exercises from Exercise 4, covering JSX (JavaScript XML) and ES6 (ECMAScript 2015) features.

## Objectives and Outcomes

JSX (JavaScript XML) and ES6 (ECMAScript 2015) are two important concepts in modern JavaScript development, often used together in frameworks like React. By the end of this exercise, you should have a good overview of JSX and ES6.

## Exercises Implemented

### 1. Hello React Design
- Displays "Hello React" with "React" in blue color
- Matches the design shown in the exercise image

### 2. React Logo Design
- Shows the React logo (atom-like structure)
- Includes horizontal line with vertical extension
- Displays captions: "This is the React logo!" and "(I don't know why it is here either)"
- Shows description: "The library for web and native user interfaces"

### 3. Navbar with JSX
- Creates a navigation bar with dark gray background
- Contains four items: Home (green), Search, Contact, and Login (black)
- Implemented using JSX

### 4. JSX Text Display
- Displays "This is JSX" in bold blue text

### 5. Course List Display
- Shows "Course names" heading
- Displays bulleted list with: React, ReactNative, NodeJs

## ES6 and JSX Features Implemented

### People Array Operations
```javascript
const people = [
  {name: 'Jack', age: 50},
  {name: 'Michael', age: 9}, 
  {name: 'John', age: 40}, 
  {name: 'Ann', age: 19}, 
  {name: 'Elisabeth', age: 16}
];
```

- **Find first teenager**: Uses `find()` method
- **Find all teenagers**: Uses `filter()` method  
- **Check if every person is teenager**: Uses `every()` method
- **Check if any person is teenager**: Uses `some()` method

### Array Reduce Operations
```javascript
const array = [1, 2, 3, 4];
```

- **Sum with reduce**: `array.reduce((acc, curr) => acc + curr, 0)`
- **Product with reduce**: `array.reduce((acc, curr) => acc * curr, 1)`
- **Arrow functions**: Used for concise function syntax

### Companies Data Operations
```javascript
const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  // ... more companies
];
```

- **Print company names**: Uses `forEach()`
- **Filter companies after 1987**: Uses `filter()`
- **Get Retail companies**: Filters by category "Retail"
- **Increment start year**: Maps and modifies start year (+1)
- **Sort by end date**: Uses `sort()` method
- **Sort ages descending**: Uses `sort()` with comparison function
- **Sum all ages**: Uses `reduce()` method

### ES6 Features Demonstrated

1. **Object Destructuring**:
   ```javascript
   const { name, category } = companies[0];
   const { address: { street } } = person;
   ```

2. **Spread Operator**:
   ```javascript
   const companiesSortedByEnd = [...companies].sort((a, b) => a.end - b.end);
   ```

3. **Arrow Functions**:
   ```javascript
   const isTeenager = (age) => age >= 10 && age <= 20;
   ```

4. **Rest Parameters**:
   ```javascript
   const sumNumbers = (...numbers) => numbers.reduce((acc, curr) => acc + curr, 0);
   ```

5. **Template Literals**:
   ```javascript
   return `Shape with color: ${this.color}`;
   ```

6. **Classes and Inheritance**:
   - `Shape` superclass with `getArea()` and `toString()` methods
   - `Rectangle` and `Triangle` subclasses extending `Shape`

7. **Promises**:
   ```javascript
   const getRandomNumberPromise = () => {
     return new Promise((resolve, reject) => {
       const randomNum = Math.floor(Math.random() * 10) + 1;
       if (randomNum > 5) {
         resolve(randomNum);
       } else {
         reject("Error");
       }
     });
   };
   ```

## Shape Classes Implementation

The application includes a complete implementation of the Shape class hierarchy as shown in the UML diagram:

- **Shape (Superclass)**: Defines the interface with `getArea()` and `toString()` methods
- **Rectangle (Subclass)**: Implements area calculation for rectangles
- **Triangle (Subclass)**: Implements area calculation for triangles

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

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Elements**: Counter button, promise demonstration
- **Real-time Data**: All ES6 operations are performed on real data
- **Visual Components**: Styled components matching the exercise requirements

## File Structure

- `src/App.js`: Main application component with all exercises
- `src/App.css`: Styling for all components
- `src/ShapeClasses.js`: Shape class implementations
- `public/index.html`: HTML template

## Technologies Used

- React 19.1.1
- ES6+ JavaScript features
- JSX for component structure
- CSS3 for styling
- Modern JavaScript array methods (map, filter, reduce, etc.)

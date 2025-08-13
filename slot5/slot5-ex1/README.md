# Healthy Recipe Finder

A modern, responsive React application for discovering and exploring healthy recipes. Built with React Bootstrap for a clean, professional interface.

## Features

- **Recipe Grid Display**: Beautiful card-based layout showing recipe information
- **Search Functionality**: Search recipes by name or ingredients
- **Filter Options**: Filter by maximum prep time and cook time
- **Recipe Modal**: Detailed view with "Add to Cart" and "Close" options
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Toast Notifications**: User feedback for cart actions

## Components Structure

```
src/components/
├── Header.js          # Navigation bar with logo and menu
├── Hero.js           # Main hero section with search and filters
├── RecipeCard.js     # Individual recipe card component
├── RecipeList.js     # Grid container for recipe cards
├── RecipeModal.js    # Modal for detailed recipe view
├── Footer.js         # Footer with social media links
└── *.css             # Component-specific stylesheets
```

## Recipe Data

The application includes 8 healthy recipes:

1. Mediterranean Chickpea Salad
2. Avocado & Tomato Wholegrain Toast
3. One-Pan Lemon Garlic Salmon
4. Quinoa Veggie Power Bowl
5. Sweet Potato Black Bean Tacos
6. Greek Yogurt Berry Parfait
7. Lentil & Spinach Soup
8. Banana Oat Pancakes

Each recipe includes:
- Title and description
- Servings count
- Prep and cook times
- Image placeholder

## Technologies Used

- **React 19.1.1**: Modern React with hooks
- **React Bootstrap**: UI components and responsive grid
- **React Icons**: Icon library for UI elements
- **CSS3**: Custom styling with modern features

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (not recommended)

## Project Structure

```
slot5-ex1/
├── public/
│   ├── images/           # Recipe images (placeholders)
│   └── index.html        # Main HTML file
├── src/
│   ├── components/       # React components
│   ├── App.js           # Main application component
│   ├── App.css          # Application styles
│   └── index.js         # Application entry point
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## Features Implementation

### Search and Filter
- Real-time search through recipe titles and descriptions
- Dropdown filters for maximum prep and cook times
- Combined filtering logic for multiple criteria

### Modal Functionality
- Click "View Recipe" to open detailed modal
- Modal displays recipe image, title, description, and details
- "Add to Cart" button with success notification
- "Close" button to dismiss modal

### Responsive Design
- Bootstrap grid system for responsive layouts
- Mobile-first approach with custom breakpoints
- Optimized for all screen sizes

## Customization

### Colors
The application uses a custom color scheme:
- Primary Green: `#2c5530`
- Dark Green: `#1e3a22`
- Accent Orange: `#ff6b35`
- Light Background: `#fafafa`

### Styling
- Custom CSS with modern design principles
- Smooth transitions and hover effects
- Consistent spacing and typography
- Accessibility-focused design

## Future Enhancements

- Add actual recipe images
- Implement shopping cart functionality
- Add recipe categories and tags
- Include nutritional information
- Add user authentication
- Implement recipe favorites
- Add print/share functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes as part of the FER202_BL3 course.

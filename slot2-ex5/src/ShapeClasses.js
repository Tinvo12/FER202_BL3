// Shape Classes Implementation based on UML Diagram

// Superclass: Shape
class Shape {
  constructor(color) {
    this.color = color;
  }

  getArea() {
    // This should be implemented by subclasses
    throw new Error("getArea() must be implemented by subclass");
  }

  toString() {
    return `Shape with color: ${this.color}`;
  }
}

// Subclass: Rectangle
class Rectangle extends Shape {
  constructor(color, length, width) {
    super(color);
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }

  toString() {
    return `Rectangle with color: ${this.color}, length: ${this.length}, width: ${this.width}, area: ${this.getArea()}`;
  }
}

// Subclass: Triangle
class Triangle extends Shape {
  constructor(color, base, height) {
    super(color);
    this.base = base;
    this.height = height;
  }

  getArea() {
    return 0.5 * this.base * this.height;
  }

  toString() {
    return `Triangle with color: ${this.color}, base: ${this.base}, height: ${this.height}, area: ${this.getArea()}`;
  }
}

// Export classes for use in other files
export { Shape, Rectangle, Triangle };

// Example usage and testing
export const createShapeExamples = () => {
  const rectangle = new Rectangle("red", 5, 3);
  const triangle = new Triangle("blue", 4, 6);
  
  console.log("Rectangle:", rectangle.toString());
  console.log("Triangle:", triangle.toString());
  
  return { rectangle, triangle };
};

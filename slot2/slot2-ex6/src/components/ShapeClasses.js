import React, { useState, useEffect } from 'react';

// Shape class (Superclass)
class Shape {
  constructor(color) {
    this.color = color;
  }

  getArea() {
    // This should be overridden by subclasses
    return 0;
  }

  toString() {
    return `Shape with color: ${this.color}`;
  }
}

// Rectangle class (Subclass)
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

// Triangle class (Subclass)
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

const ShapeClasses = () => {
  const [shapes, setShapes] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    // Create instances of shapes
    const rectangle = new Rectangle('red', 5, 3);
    const triangle = new Triangle('blue', 4, 6);
    const shape = new Shape('green');

    setShapes([shape, rectangle, triangle]);

    // Demonstrate polymorphism
    const shapeArray = [rectangle, triangle];
    const areas = shapeArray.map(shape => shape.getArea());
    const descriptions = shapeArray.map(shape => shape.toString());

    setResults({
      areas,
      descriptions,
      totalArea: areas.reduce((sum, area) => sum + area, 0)
    });
  }, []);

  return (
    <div className="section">
      <h2>4. Shape Classes (Inheritance Hierarchy)</h2>
      
      <div className="uml-diagram">
        <h3>UML Class Diagram Implementation:</h3>
        <div className="class-diagram">
          <div className="class-box">
            <h4>Shape (Superclass)</h4>
            <div className="attributes">
              <p>- color: String</p>
            </div>
            <div className="methods">
              <p>+ getArea(): double</p>
              <p>+ toString(): String</p>
            </div>
          </div>
          
          <div className="inheritance-arrow">↓</div>
          
          <div className="subclasses">
            <div className="class-box">
              <h4>Rectangle (Subclass)</h4>
              <div className="attributes">
                <p>- length: int</p>
                <p>- width: int</p>
              </div>
              <div className="methods">
                <p>+ getArea(): double</p>
                <p>+ toString(): String</p>
              </div>
            </div>
            
            <div className="class-box">
              <h4>Triangle (Subclass)</h4>
              <div className="attributes">
                <p>- base: int</p>
                <p>- height: int</p>
              </div>
              <div className="methods">
                <p>+ getArea(): double</p>
                <p>+ toString(): String</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="results">
        <h3>Class Instances and Results:</h3>
        
        <div className="result-item">
          <h4>Shape Instances:</h4>
          {shapes.map((shape, index) => (
            <div key={index} className="shape-instance">
              <h5>{shape.constructor.name}:</h5>
              <p><strong>toString():</strong> {shape.toString()}</p>
              <p><strong>getArea():</strong> {shape.getArea()}</p>
            </div>
          ))}
        </div>

        <div className="result-item">
          <h4>Polymorphism Demonstration:</h4>
          <p><strong>Areas:</strong> {results.areas?.join(', ')}</p>
          <p><strong>Total Area:</strong> {results.totalArea}</p>
          <div className="descriptions">
            <h5>Shape Descriptions:</h5>
            {results.descriptions?.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </div>

        <div className="code-example">
          <h4>Code Implementation:</h4>
          <pre>
{`// Superclass defines the expected behaviors
class Shape {
  constructor(color) {
    this.color = color;
  }
  
  getArea() { return 0; }
  toString() { return \`Shape with color: \${this.color}\`; }
}

// Subclasses provide the actual implementations
class Rectangle extends Shape {
  constructor(color, length, width) {
    super(color);
    this.length = length;
    this.width = width;
  }
  
  getArea() { return this.length * this.width; }
  toString() { return \`Rectangle with color: \${this.color}, area: \${this.getArea()}\`; }
}

class Triangle extends Shape {
  constructor(color, base, height) {
    super(color);
    this.base = base;
    this.height = height;
  }
  
  getArea() { return 0.5 * this.base * this.height; }
  toString() { return \`Triangle with color: \${this.color}, area: \${this.getArea()}\`; }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ShapeClasses;

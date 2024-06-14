const canvas = new fabric.Canvas('c');

// Define the border's outer and inner dimensions
const outerWidth = 500;
const outerHeight = 500;
const borderWidth = 20; // The width of the border

// Calculate the inner dimensions
const innerWidth = outerWidth - borderWidth * 2;
const innerHeight = outerHeight - borderWidth * 2;

// Define the corner radius
const cornerRadius = 50;

// Define the path for the border shape
const path = new fabric.Path(`M ${borderWidth} ${cornerRadius}
                              Q ${borderWidth} ${borderWidth} ${cornerRadius} ${borderWidth}
                              L ${outerWidth - cornerRadius} ${borderWidth}
                              Q ${outerWidth - borderWidth} ${borderWidth} ${outerWidth - borderWidth} ${cornerRadius}
                              L ${outerWidth - borderWidth} ${outerHeight - cornerRadius}
                              Q ${outerWidth - borderWidth} ${outerHeight - borderWidth} ${outerWidth - cornerRadius} ${outerHeight - borderWidth}
                              L ${cornerRadius} ${outerHeight - borderWidth}
                              Q ${borderWidth} ${outerHeight - borderWidth} ${borderWidth} ${outerHeight - cornerRadius}
                              L ${borderWidth} ${cornerRadius} Z`, {
  fill: 'transparent',
  stroke: 'black',
  strokeWidth: 1,
  selectable: false
});

// Add the border to the canvas
canvas.add(path);
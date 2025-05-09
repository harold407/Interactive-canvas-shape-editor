/**
 * ============================================================================
 * COMPLETE NAME: vale,harold hector p.
 * SEX: Male
 * ADDRESS:007 zone 1 salog, goa cam. sur
 * COURSE, YEAR, SECTION: BSIT 2B
 * NAME OF SCHOOL: partido state university
 * SEMESTER AND ACADEMIC YEAR: 2st Semester, A.Y. 2024–2025
 * SUBJECT CODE AND TITLE: PF2_EVENT DRIVEN PROGRAMING
 * NAME OF SUBJECT INSTRUCTOR: Prof. RJ F. ABIO
 * ============================================================================
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let circles = [];
let selectedCircle = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
const DEFAULT_RADIUS = 20;

// Draw all circles
function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = (circle === selectedCircle) ? 'red' : 'blue';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
}

// Get circle at a position
function getCircleAt(x, y) {
  return circles.find(circle => {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
  });
}

// Mouse down: add or select circle
canvas.addEventListener('mousedown', function (e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const circle = getCircleAt(x, y);
  if (circle) {
    selectedCircle = circle;
    isDragging = true;
    dragOffsetX = x - circle.x;
    dragOffsetY = y - circle.y;
  } else {
    const newCircle = {
      x: x,
      y: y,
      radius: DEFAULT_RADIUS
    };
    circles.push(newCircle);
    selectedCircle = newCircle;
  }
  drawCircles();
});

// Mouse move: drag selected circle
canvas.addEventListener('mousemove', function (e) {
  if (isDragging && selectedCircle) {
    const rect = canvas.getBoundingClientRect();
    selectedCircle.x = e.clientX - rect.left - dragOffsetX;
    selectedCircle.y = e.clientY - rect.top - dragOffsetY;
    drawCircles();
  }
});

// Mouse up: stop dragging
canvas.addEventListener('mouseup', function () {
  isDragging = false;
});

// Keydown: delete selected circle
window.addEventListener('keydown', function (e) {
  if (e.key === 'Delete' && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    drawCircles();
  }
});

// Mouse wheel: resize selected circle
canvas.addEventListener('wheel', function (e) {
  if (selectedCircle) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 2 : -2;
    selectedCircle.radius = Math.max(5, selectedCircle.radius + delta);
    drawCircles();
  }
});

// Initial draw
drawCircles();

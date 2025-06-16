Card Shuffling and Sorting App (MERN Stack)
This is a MERN stack web application that allows users to shuffle and sort a standard deck of playing cards. The backend handles the card logic, and the frontend provides an interactive and responsive UI.

Features
• Shuffle a standard deck of 52 playing cards.
• Sort the deck using one of two random sorting methods.
• Clean and responsive user interface built with React.
• Functional React components with hooks.
• Backend built using Node.js and Express.

 Tech Stack
Frontend: React (with hooks)
Backend: Node.js, Express
HTTP Requests: Axios
Cross-Origin: CORS

Installation & Setup
1. Clone the repository
git clone https://github.com/lakshmi1005/card-app2.git
cd card-app2

2. Backend Setup
cd backend
npm install
npm start

This will start the backend on http://localhost:5000

3. Frontend Setup
cd ../frontend
npm install
npm start

The React frontend will launch at http://localhost:3000

API Endpoints
Method	Endpoint	Description
GET	/api/cards/shuffle	Shuffles the deck
GET	/api/cards/sort	Sorts the deck

Sorting Logic
The backend uses two different sorting methods and randomly picks one each time the user clicks Sort:

1. Alphabetical Sort
2. Suit and Value Sort 

Author
Dhanalakshmi Chittineni
Full-stack Developer
Centurion, Johannesburg

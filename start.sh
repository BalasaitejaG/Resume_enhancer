#!/bin/bash

# Start the Python backend server
echo "Starting Python backend server..."
cd backend
python3 -m pip install -r requirements.txt > /dev/null
python3 server.py &
BACKEND_PID=$!
cd ..

# Wait a bit for the backend to start
sleep 2

# Start the frontend development server
echo "Starting frontend development server..."
npm run dev &
FRONTEND_PID=$!

# Function to handle cleanup when the script is terminated
function cleanup {
  echo "Stopping servers..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}

# Register the cleanup function to run when script is terminated
trap cleanup SIGINT SIGTERM EXIT

# Wait for the user to terminate the script
echo ""
echo "Both servers are running!"
echo "- Frontend: http://localhost:5173"
echo "- Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers."
wait 
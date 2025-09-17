#!/bin/bash

echo "🚀 Starting AI Yield Aggregator Development Environment..."
echo

echo "📦 Installing dependencies..."
echo

echo "Installing root dependencies..."
npm install

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

echo "Installing contract dependencies..."
cd contracts
npm install
cd ..

echo
echo "✅ All dependencies installed!"
echo

echo "🔧 Starting development servers..."
echo

echo "Starting backend server on port 5000..."
cd backend
python app.py &
BACKEND_PID=$!
cd ..

echo "Waiting for backend to start..."
sleep 3

echo "Starting frontend server on port 3000..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo
echo "🎉 Development environment started!"
echo
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo
echo "Press Ctrl+C to stop all servers..."

# Function to cleanup on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait

@echo off
echo 🚀 Starting AI Yield Aggregator Development Environment...
echo.

echo 📦 Installing dependencies...
echo.

echo Installing root dependencies...
call npm install

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo Installing backend dependencies...
cd backend
pip install -r requirements.txt
cd ..

echo Installing contract dependencies...
cd contracts
call npm install
cd ..

echo.
echo ✅ All dependencies installed!
echo.

echo 🔧 Starting development servers...
echo.

echo Starting backend server on port 5000...
start "Backend Server" cmd /k "cd backend && python app.py"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting frontend server on port 3000...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo 🎉 Development environment started!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo.
echo Press any key to exit...
pause > nul

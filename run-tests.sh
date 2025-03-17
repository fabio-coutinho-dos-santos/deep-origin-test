#!/bin/bash

# Run tests for backend service
echo "Running tests in backend..."
docker-compose exec svc-backend sh -c "npm run test"

# Check if backend tests passed
if [ $? -eq 0 ]; then
  echo "Backend tests passed!"
else
  echo "Backend tests failed!"
  exit 1
fi

# Run tests for frontend service
echo "Running tests in frontend..."
docker-compose exec svc-frontend sh -c "npm run test -q"

# Check if frontend tests passed
if [ $? -eq 0 ]; then
  echo "Frontend tests passed!"
else
  echo "Frontend tests failed!"
  exit 1
fi

echo "Tests completed."
exit 1

.PHONY: dev migrate seed test build clean

dev:
	@echo "Starting BursaryHub backend server..."
	go run ./backend/main.go

migrate:
	@echo "Running database migrations..."
	psql $(DATABASE_URL) -f db/schema.sql

seed:
	@echo "Running database seeds..."
	psql $(DATABASE_URL) -f db/seeds.sql

test:
	@echo "Running Go tests..."
	go test ./backend/... -v
	@echo "Running Hardhat tests..."
	cd contracts && npx hardhat test

build:
	@echo "Building BursaryHub binary..."
	go build -o bin/bursaryhub ./backend/main.go

clean:
	rm -rf bin/
	rm -rf node_modules/
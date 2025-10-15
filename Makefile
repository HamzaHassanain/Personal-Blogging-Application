.PHONY: help build-all build-client build-server build-dashboard up down dev logs clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Production commands
build-all: ## Build all services
	docker-compose build

build-client: ## Build client service
	docker-compose build client

build-server: ## Build server service
	docker-compose build server

build-dashboard: ## Build dashboard service
	docker-compose build dashboard

up: ## Start all services in production mode
	docker-compose up -d

down: ## Stop all services
	docker-compose down

# Development commands
dev: ## Start all services in development mode
	docker-compose -f docker-compose.dev.yml up

dev-build: ## Build and start all services in development mode
	docker-compose -f docker-compose.dev.yml up --build

dev-down: ## Stop development services
	docker-compose -f docker-compose.dev.yml down

# Utility commands
logs: ## Show logs for all services
	docker-compose logs -f

logs-server: ## Show logs for server service
	docker-compose logs -f server

logs-client: ## Show logs for client service
	docker-compose logs -f client

logs-dashboard: ## Show logs for dashboard service
	docker-compose logs -f dashboard

clean: ## Remove all containers, images, and volumes
	docker-compose down -v --rmi all
	docker system prune -f

restart: ## Restart all services
	docker-compose restart

# Database commands
db-backup: ## Backup MongoDB database
	docker exec blog-mongodb mongodump --archive --gzip --db blog_db | gzip > backup-$(shell date +%Y%m%d-%H%M%S).gz

db-restore: ## Restore MongoDB database (usage: make db-restore BACKUP=backup-file.gz)
	gunzip -c $(BACKUP) | docker exec -i blog-mongodb mongorestore --archive --gzip --drop

# Individual service commands
server-shell: ## Access server container shell
	docker exec -it blog-server sh

client-shell: ## Access client container shell
	docker exec -it blog-client sh

dashboard-shell: ## Access dashboard container shell
	docker exec -it blog-dashboard sh

db-shell: ## Access MongoDB shell
	docker exec -it blog-mongodb mongosh --username admin --password password123 --authenticationDatabase admin
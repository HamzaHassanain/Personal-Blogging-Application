# Docker Setup for Personal Blogging Application

This document explains how to run the Personal Blogging Application using Docker containers.

## Architecture

The application consists of 4 main services:

- **MongoDB**: Database service
- **Server**: Node.js/Express API backend
- **Client**: React frontend application
- **Dashboard**: Vite-based admin dashboard

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Git (to clone the repository)

### Production Setup

1. **Clone and setup environment:**

```bash
git clone <repository-url>
cd Personal-Blogging-Application
cp .env.example .env
# Edit .env with your actual values
```

2. **Build and start all services:**

```bash
make build-all
make up
```

3. **Access the applications:**

- Client: http://localhost:3000
- Dashboard: http://localhost:4000
- API Server: http://localhost:5000
- MongoDB: localhost:27017

### Development Setup

1. **Start development environment:**

```bash
make dev
```

2. **Access the applications:**

- Client: http://localhost:3000 (with hot reload)
- Dashboard: http://localhost:4000 (with hot reload)
- API Server: http://localhost:5000 (with nodemon)

## Available Commands

### Production Commands

```bash
make build-all        # Build all services
make up              # Start all services
make down            # Stop all services
make logs            # View logs
make restart         # Restart all services
```

### Development Commands

```bash
make dev             # Start development environment
make dev-build       # Build and start development environment
make dev-down        # Stop development environment
```

### Service-specific Commands

```bash
make build-client    # Build only client
make build-server    # Build only server
make build-dashboard # Build only dashboard
make logs-server     # View server logs
make logs-client     # View client logs
make logs-dashboard  # View dashboard logs
```

### Database Commands

```bash
make db-backup       # Backup database
make db-restore BACKUP=file.gz  # Restore database
make db-shell        # Access MongoDB shell
```

### Debugging Commands

```bash
make server-shell    # Access server container
make client-shell    # Access client container
make dashboard-shell # Access dashboard container
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123
MONGO_INITDB_DATABASE=blog_db

# Server
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/blog_db?authSource=admin
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URLs
REACT_APP_API_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000
```

## Service Details

### Server (Backend API)

- **Port**: 5000
- **Technology**: Node.js, Express, MongoDB
- **Features**: REST API, Authentication, File uploads
- **Health Check**: Available at `/api/health`

### Client (Frontend)

- **Port**: 3000 (dev), 80 (prod)
- **Technology**: React, React Router
- **Features**: Blog browsing, responsive design

### Dashboard (Admin Interface)

- **Port**: 4000 (dev), 80 (prod)
- **Technology**: React, Vite
- **Features**: Blog management, admin controls

### MongoDB (Database)

- **Port**: 27017
- **Technology**: MongoDB 7.0
- **Features**: Persistent data storage, authentication

## Volumes

The following data is persisted:

- `mongodb_data`: Database files
- `uploads_data`: Uploaded files

## Networks

All services communicate through the `blog-network` bridge network.

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 4000, 5000, and 27017 are available
2. **Permission issues**: Ensure Docker has proper permissions
3. **Build failures**: Clear Docker cache with `make clean`

### Viewing Logs

```bash
# All services
make logs

# Specific service
make logs-server
make logs-client
make logs-dashboard
```

### Rebuilding Services

```bash
# Rebuild specific service
make build-server
make build-client
make build-dashboard

# Rebuild everything
make clean
make build-all
```

### Database Issues

```bash
# Check database connection
make db-shell

# Backup database
make db-backup

# Clean restart
make down
docker volume rm personalbloggingapplication_mongodb_data
make up
```

## Production Deployment

For production deployment:

1. **Update environment variables** in `.env`
2. **Set strong passwords** for MongoDB and JWT
3. **Configure SSL certificates** if needed
4. **Set up reverse proxy** (Nginx configuration included)
5. **Configure monitoring** and logging
6. **Set up backup strategy** for database

## Security Considerations

- Change default MongoDB credentials
- Use strong JWT secrets
- Configure CORS properly
- Set up SSL/TLS certificates
- Regularly update base images
- Scan images for vulnerabilities

## Monitoring

The setup includes:

- Health checks for all services
- Logging to stdout (collected by Docker)
- MongoDB connection monitoring
- Container restart policies

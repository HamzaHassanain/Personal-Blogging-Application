# Base image with Node.js and pnpm
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all package.json files to install dependencies
COPY Apps/Client/package.json ./Apps/Client/
COPY Apps/Server/package.json ./Apps/Server/
COPY Apps/Dashboard/package.json ./Apps/Dashboard/
COPY Shared/ui/package.json ./Shared/ui/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build shared packages first
RUN pnpm turbo build --filter=@personalbloggingapplication/ui

# =============================================================================
# Client (React) Build Stage
# =============================================================================
FROM base AS client-build
RUN pnpm turbo build --filter=hamzahasanain.xyz-forntend

# =============================================================================
# Dashboard (Vite) Build Stage  
# =============================================================================
FROM base AS dashboard-build
RUN pnpm turbo build --filter=dashboard

# =============================================================================
# Client Production Image
# =============================================================================
FROM nginx:alpine AS client
COPY --from=client-build /app/Apps/Client/build /usr/share/nginx/html
COPY Apps/Client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# =============================================================================
# Dashboard Production Image
# =============================================================================
FROM nginx:alpine AS dashboard-prod
COPY --from=dashboard-build /app/Apps/Dashboard/dist /usr/share/nginx/html
COPY Apps/Dashboard/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# =============================================================================
# Server Production Image
# =============================================================================
FROM node:20-alpine AS server
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY Apps/Server/package.json ./Apps/Server/
COPY Shared/ui/package.json ./Shared/ui/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy server source code
COPY Apps/Server ./Apps/Server
COPY Shared ./Shared

WORKDIR /app/Apps/Server

EXPOSE 5000
CMD ["node", "index.mjs"]
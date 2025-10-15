# Build stage
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY Apps/Dashboard/package.json ./Apps/Dashboard/
COPY Shared/ui/package.json ./Shared/ui/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY Apps/Dashboard ./Apps/Dashboard
COPY Shared ./Shared

# Build the app
WORKDIR /app/Apps/Dashboard
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=builder /app/Apps/Dashboard/dist /usr/share/nginx/html

# Copy nginx configuration
COPY Apps/Dashboard/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
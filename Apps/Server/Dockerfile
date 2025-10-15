FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Install app dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy app source
COPY . .

# Create uploads directory if needed
RUN mkdir -p uploads

EXPOSE 5000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

CMD ["node", "index.mjs"]
# Build stage
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app/.output ./.output

# Expose the port Nuxt uses
EXPOSE 3000

# Run the app
CMD ["node", ".output/server/index.mjs"]

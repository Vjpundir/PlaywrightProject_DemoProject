# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.61.1-noble

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Run tests by default
CMD ["npx", "playwright", "test"]
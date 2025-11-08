FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose port
EXPOSE 5000

# Set environment variables (these will be overridden by docker-compose or deployment platform)
ENV NODE_ENV=production
ENV PORT=5000

# Start the application
CMD ["npm", "run", "start-dev"]

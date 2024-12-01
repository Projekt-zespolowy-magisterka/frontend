FROM node:20.7.0-alpine3.18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install



FROM node:20.7.0-alpine3.18
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
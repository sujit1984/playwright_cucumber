FROM mcr.microsoft.com/playwright:v1.60.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV HEADLESS=true
ENV BASE_URL=https://www.automationexercise.com

CMD ["npm", "run", "test:all:parallel"]

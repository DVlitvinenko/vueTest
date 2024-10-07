# frontend/Dockerfile
FROM node:16

# Установка зависимостей
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Копирование файлов приложения
COPY . .

# Сборка приложения
RUN npm run build

# Запуск приложения
CMD ["npm", "run", "serve"]
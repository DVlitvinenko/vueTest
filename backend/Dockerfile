# backend/Dockerfile
FROM php:8.3-fpm

# Установка необходимых расширений
RUN apt-get update && apt-get install -y \
       libpng-dev libjpeg-dev libfreetype6-dev \
       libzip-dev unzip git \
       && docker-php-ext-configure gd --with-freetype --with-jpeg \
       && docker-php-ext-install gd zip

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Копирование файлов приложения
WORKDIR /var/www
COPY . .

# Установка зависимостей
RUN composer update
RUN composer install

# Настройка прав доступа
RUN chown -R www-data:www-data /var/www
CMD ["php", "artisan", "serve"]

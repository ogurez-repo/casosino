# 🐳 Docker Deploy Guide

## Prerequisites
- Docker установлен (https://docs.docker.com/get-docker/)
- Docker Compose установлен (обычно идёт вместе с Docker)

## Quick Start

### 1. Подготовка переменных окружения

Создайте файл `.env` в корне проекта с вашими Telegram credentials:

```bash
cp .env.example .env
```

Отредактируйте `.env`:
```
TELEGRAM_BOT_TOKEN=ваш_токен_здесь
TELEGRAM_CHAT_ID=ваш_чат_id_здесь
```

### 2. Запуск с Docker Compose (рекомендуется)

**Собрать и запустить:**
```bash
docker-compose up --build
```

**Запустить (если уже собрано):**
```bash
docker-compose up
```

**В фоновом режиме:**
```bash
docker-compose up -d
```

**Остановить:**
```bash
docker-compose down
```

**Просмотр логов:**
```bash
docker-compose logs -f casosino
```

Приложение будет доступно на: **http://localhost:3000**

### 3. Ручная работа с Docker

**Собрать образ:**
```bash
docker build -t casosino:latest .
```

**Запустить контейнер:**
```bash
docker run -p 3000:3000 \
  -e TELEGRAM_BOT_TOKEN="ваш_токен" \
  -e TELEGRAM_CHAT_ID="ваш_чат_id" \
  --name casosino \
  casosino:latest
```

**Остановить контейнер:**
```bash
docker stop casosino
```

**Удалить контейнер:**
```bash
docker rm casosino
```

## Production Deployment

### На VPS или облачном сервере:

1. **Установите Docker и Docker Compose**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

2. **Скопируйте проект на сервер:**
   ```bash
   git clone <your-repo> /opt/casosino
   cd /opt/casosino
   ```

3. **Создайте `.env` файл:**
   ```bash
   nano .env
   ```

4. **Запустите в фоне:**
   ```bash
   docker-compose up -d
   ```

5. **Проверьте статус:**
   ```bash
   docker-compose ps
   ```

### Autostart при перезагрузке сервера:

Docker Compose уже настроен с `restart: unless-stopped`, поэтому контейнер автоматически перезагружается при перезагрузке сервера.

### Обновление приложения:

```bash
git pull
docker-compose up -d --build
```

## Troubleshooting

**Приложение не запускается:**
```bash
docker-compose logs casosino
```

**Переубрать и пересобрать:**
```bash
docker-compose down
docker system prune -a
docker-compose up --build
```

**Проверить работу контейнера:**
```bash
docker-compose exec casosino curl http://localhost:3000
```

## Переменные окружения

Все доступные переменные в `docker-compose.yml`:

```yaml
environment:
  - TELEGRAM_BOT_TOKEN=...
  - TELEGRAM_CHAT_ID=...
  - NODE_ENV=production
```

Можно добавить другие переменные по мере необходимости.

## Полезные команды

```bash
# Просмотр всех контейнеров
docker ps -a

# Просмотр всех образов
docker images

# Удалить неиспользуемые ресурсы
docker system prune

# Зайти в контейнер
docker-compose exec casosino sh

# Просмотр использования ресурсов
docker stats
```

## Размер образа

Благодаря использованию oven/bun:slim, образ получается компактным (~500MB).

Для production на слабых серверах можно ещё оптимизировать, используя multi-stage build (уже применён).

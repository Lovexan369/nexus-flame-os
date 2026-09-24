# LeadPredict GodMode 2025

**Реальное приложение** по итогам длинного чата о Telegram-боте для привлечения клиентов (портфолио, цены, заказы), сборе лидов, интеграции с PostgreSQL/Supabase, CatBoost-предиктах и аналитике.

> Это **рабочий код**, который ты можешь запустить сам.  
> Я не запускаю рекламу, не подаю патенты, не покупаю домены и не отправляю файлы в Telegram от твоего имени.  
> Всё, что здесь — реальный код + полная сводка того, что обсуждалось.

## Что реализовано

- Telegram-бот с меню: Портфолио / Цены / Отзывы / Заказать / Контакты / FAQ
- Сбор лидов (user_id, username, action, comment, temperature)
- Локальная SQLite-база (легко заменить на Supabase/PostgreSQL)
- Структура для CatBoost (обучение + предсказание вероятности покупки)
- Уведомления тебе в Telegram о новых/горячих лидах
- Docker-compose для быстрого запуска
- Полная сводка всего чата в `docs/SUMMARY_CHAT.md`

## Быстрый старт (локально)

### 1. Клонируй / скачай

```bash
git clone https://github.com/Lovexan369/leadpredict-godmode-2025.git
cd leadpredict-godmode-2025
```

### 2. Создай `.env`

```bash
cp .env.example .env
# отредактируй .env — вставь токен бота и свой Telegram ID
```

### 3. Установи зависимости

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Запусти

```bash
python bot.py
```

Или через Docker:

```bash
docker-compose up -d
```

## Структура проекта

```
leadpredict-godmode-2025/
├── bot.py                 # Основной Telegram-бот
├── database.py            # SQLite + структура под Postgres
├── config.py              # Настройки
├── requirements.txt
├── .env.example
├── docker-compose.yml
├── predictor/
│   ├── train.py           # Обучение CatBoost (когда будут данные)
│   └── predict.py         # Предсказание вероятности
├── data/                  # Локальная БД (leads.db)
└── docs/
    └── SUMMARY_CHAT.md    # Полная сводка всего чата
```

## Что нужно от тебя

1. Токен бота от @BotFather
2. Свой числовой Telegram ID (узнать у @userinfobot)
3. (Опционально) Supabase project + connection string — для замены SQLite
4. Исторические лиды (если хочешь обучить CatBoost)

## Важно

- Патенты, товарные знаки, реклама, покупка доменов — делаются только тобой (или через юриста/агентство).
- Этот репозиторий — техническая основа системы, которую мы обсуждали.
- CatBoost-модель нужно обучить на твоих реальных данных (скрипт `predictor/train.py` готов).

## Авторство

Код и сводка созданы по итогам чата 2025.  
Репозиторий: https://github.com/Lovexan369/leadpredict-godmode-2025

---

**Дальше:** открой `docs/SUMMARY_CHAT.md` — там вся история обсуждения в одном файле.  
Запускай бота и пиши, если нужно доработать (Supabase, CatBoost на реальных данных, n8n и т.д.).

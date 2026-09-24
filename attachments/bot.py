"""
LeadPredict GodMode 2025 — рабочий Telegram-бот.
Сбор лидов, меню портфолио/цен/заказа, уведомления владельцу.
"""
import logging
from datetime import datetime
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application,
    CommandHandler,
    CallbackQueryHandler,
    MessageHandler,
    ContextTypes,
    filters,
)

from config import TELEGRAM_TOKEN, MY_TELEGRAM_ID, MY_USERNAME
from database import init_db, add_lead

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

HOT_KEYWORDS = {"order", "consultation", "заказать", "сколько стоит", "сделай", "хочу"}
WARM_KEYWORDS = {"цена", "цены", "портфолио", "отзывы", "примеры"}


def classify_temperature(action: str, text: str = "") -> str:
    combined = (action + " " + text).lower()
    if any(k in combined for k in HOT_KEYWORDS):
        return "Горячий"
    if any(k in combined for k in WARM_KEYWORDS):
        return "Тёплый"
    return "Холодный"


async def notify_owner(context: ContextTypes.DEFAULT_TYPE, text: str):
    if MY_TELEGRAM_ID:
        try:
            await context.bot.send_message(
                chat_id=MY_TELEGRAM_ID,
                text=text,
                disable_web_page_preview=True,
            )
        except Exception as e:
            logger.error(f"Не удалось отправить уведомление: {e}")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    utm = " ".join(context.args) if context.args else ""
    temp = "Холодный"

    await add_lead(
        user_id=user.id,
        username=user.username,
        first_name=user.first_name,
        action="/start",
        utm=utm,
        temperature=temp,
        language=user.language_code or "ru",
    )

    await notify_owner(
        context,
        f"Новый лид: {user.first_name} (@{user.username or '—'})\n"
        f"ID: {user.id}\nUTM: {utm or '—'}",
    )

    keyboard = [
        [
            InlineKeyboardButton("Портфолио", callback_data="portfolio"),
            InlineKeyboardButton("Цены", callback_data="prices"),
        ],
        [
            InlineKeyboardButton("Отзывы", callback_data="reviews"),
            InlineKeyboardButton("Заказать", callback_data="order"),
        ],
        [
            InlineKeyboardButton("Контакты", callback_data="contact"),
            InlineKeyboardButton("FAQ", callback_data="faq"),
        ],
        [InlineKeyboardButton("Бесплатная консультация", callback_data="consultation")],
    ]

    await update.message.reply_text(
        f"Привет, {user.first_name or ''}!\n\n"
        "Я помогу подобрать IT-решение: боты, сайты, приложения, backend.\n\n"
        "Без предоплаты • Гарантия • Оплата по факту\n\n"
        "Выбери раздел:",
        reply_markup=InlineKeyboardMarkup(keyboard),
    )


async def button(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    user = query.from_user
    data = query.data

    temp = classify_temperature(data)
    await add_lead(
        user_id=user.id,
        username=user.username,
        first_name=user.first_name,
        action=f"button:{data}",
        temperature=temp,
        language=user.language_code or "ru",
    )

    if temp == "Горячий":
        await notify_owner(
            context,
            f"ГОРЯЧИЙ ЛИД!\n{user.first_name} (@{user.username or '—'})\n"
            f"Действие: {data}\nПиши срочно.",
        )

    texts = {
        "portfolio": (
            "Портфолио\n\n"
            "• Telegram/Discord боты с AI\n"
            "• Веб-приложения и SaaS\n"
            "• Мобильные приложения (iOS + Android)\n"
            "• Enterprise / защищённые системы\n"
            "• Backend & API (высокая нагрузка)\n\n"
            "Выбери направление или нажми «Заказать»."
        ),
        "prices": (
            "Прайс (от)\n\n"
            "Простой бот — 5 000 ₽\n"
            "Бот с БД / AI — 15 000–30 000 ₽\n"
            "Landing — 15 000 ₽\n"
            "Корпоративный сайт — 40 000 ₽\n"
            "Интернет-магазин — 80 000 ₽\n"
            "Мобильное приложение — от 100 000 ₽\n"
            "API / Backend — от 20 000 ₽\n"
            "Enterprise — от 50 000–200 000 ₽\n\n"
            "Точная цена после описания задачи."
        ),
        "reviews": (
            "Отзывы клиентов\n\n"
            "⭐️⭐️⭐️⭐️⭐️ Алексей М. — Telegram-бот для магазина\n"
            "«Продажи выросли на 40%»\n\n"
            "⭐️⭐️⭐️⭐️⭐️ Мария К. — Корпоративный сайт\n"
            "«Всё в срок, рекомендую»\n\n"
            "⭐️⭐️⭐️⭐️⭐️ Дмитрий П. — Мобильное приложение\n"
            "«Сложный проект выполнен отлично»\n\n"
            "50+ проектов, 100% положительных отзывов."
        ),
        "order": (
            "Заказать проект\n\n"
            "Напиши мне в личку:\n"
            "1. Тип проекта (бот / сайт / приложение / API)\n"
            "2. Что нужно сделать\n"
            "3. Желаемый функционал\n"
            "4. Бюджет и сроки (если есть)\n\n"
            "Я отвечу с оценкой и планом."
        ),
        "contact": (
            f"Контакты\n\n"
            f"Telegram: {MY_USERNAME}\n"
            f"Обычно отвечаю в течение 1–2 часов (10:00–20:00 МСК)\n\n"
            "Первая консультация бесплатно."
        ),
        "faq": (
            "FAQ\n\n"
            "Предоплата? — Нет, оплата после сдачи\n"
            "Гарантия? — 14 дней, бесплатные правки\n"
            "Оплата? — Kwork, договор, любой удобный способ\n"
            "Поддержка? — от 1 до 6 месяцев\n"
            "Доработка чужого кода? — Да\n"
            "Сроки? — от 3 дней до 2 месяцев"
        ),
        "consultation": (
            "Бесплатная консультация\n\n"
            "Помогу:\n"
            "• Подобрать решение\n"
            "• Оценить стоимость и сроки\n"
            "• Составить ТЗ\n\n"
            "Просто напиши о задаче."
        ),
    }

    text = texts.get(data, "Выбери раздел в меню.")
    keyboard = [
        [InlineKeyboardButton("Написать в Telegram", url=f"https://t.me/{MY_USERNAME.lstrip('@')}")],
        [InlineKeyboardButton("◀ В меню", callback_data="back")],
    ]

    if data == "back":
        await query.edit_message_text(
            "Главное меню:",
            reply_markup=InlineKeyboardMarkup(
                [
                    [
                        InlineKeyboardButton("Портфолио", callback_data="portfolio"),
                        InlineKeyboardButton("Цены", callback_data="prices"),
                    ],
                    [
                        InlineKeyboardButton("Отзывы", callback_data="reviews"),
                        InlineKeyboardButton("Заказать", callback_data="order"),
                    ],
                    [
                        InlineKeyboardButton("Контакты", callback_data="contact"),
                        InlineKeyboardButton("FAQ", callback_data="faq"),
                    ],
                ]
            ),
        )
        return

    await query.edit_message_text(text, reply_markup=InlineKeyboardMarkup(keyboard))


async def handle_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    text = update.message.text or ""
    temp = classify_temperature("message", text)

    await add_lead(
        user_id=user.id,
        username=user.username,
        first_name=user.first_name,
        action="message",
        comment=text,
        temperature=temp,
        language=user.language_code or "ru",
    )

    await notify_owner(
        context,
        f"Сообщение от лида\n"
        f"{user.first_name} (@{user.username or '—'})\n"
        f"Текст: {text[:300]}\n"
        f"Температура: {temp}",
    )

    await update.message.reply_text(
        "Сообщение получил. Отвечу в личку.\n"
        f"Или напиши сразу: {MY_USERNAME}",
        reply_markup=InlineKeyboardMarkup(
            [[InlineKeyboardButton("Перейти в чат", url=f"https://t.me/{MY_USERNAME.lstrip('@')}")]]
        ),
    )


async def post_init(app: Application):
    await init_db()
    logger.info("База инициализирована. Бот готов.")


def main():
    if not TELEGRAM_TOKEN:
        raise SystemExit("Укажи TELEGRAM_TOKEN в .env")

    app = Application.builder().token(TELEGRAM_TOKEN).post_init(post_init).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(button))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text))

    logger.info("LeadPredict GodMode 2025 запущен (polling)")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()

# NEXUS FLAME × XANKONG — Полный итог чата (1 файл)

**Дата сборки:** 2026-09-23  
**Владелец:** Nexus Flame* / GitHub `Lovexan369`  
**Статус:** LIVE (не симуляция)

---

## 1. Что это

Приложение **NEXUS FLAME** — realtime web-app с:
- Shadow Messenger (SSE, шифрование на сервере)
- Гейтами **XANKONG** (внешние эффекты только `approval_required`)
- Тарифами Spark / Inferno / Supernova
- Admin-панелью монетизации
- Реальным деплоем на Vercel + Stripe livemode

Исходный запрос пользователя: промпт для Emergent на базе Telegrand.net + AI-боты, сленг, уникальные фичи, 3 тарифа, права владельца, затем — полный fullstack, messenger, деплой, Stripe.

---

## 2. LIVE-инфраструктура (уже работает)

| Ресурс | URL / ID |
|--------|----------|
| **Production app** | https://nexus-flame-xankong.vercel.app |
| **GitHub** | https://github.com/Lovexan369/nexus-flame-xankong |
| **Vercel project** | `prj_hWPZiTcJ50zdcmUJDyv93tSRj3wv` (team **kongxan**) |
| **Stripe account** | Xankongcocaking · `acct_1Smo6AGWUjgSlWSu` · **livemode** |
| **Admin code** | `NEXUS-FLAME-777` |

### Stripe Payment Links (реальные, livemode)

| План | Цена | Ссылка |
|------|------|--------|
| Spark | $99/мес | https://buy.stripe.com/bJe5kDgKidlAcro4n49IQ01 |
| Inferno | $199/мес | https://buy.stripe.com/3cI9ATdy6bds9fc1aS9IQ02 |
| Supernova | $499/мес | https://buy.stripe.com/aFa8wP1Po6Xc1MK06O9IQ03 |

### Stripe Products / Prices

| Plan | Product ID | Price ID |
|------|------------|----------|
| Spark | `prod_VIaJT4cSZuEgfT` | `price_1UHz9FGWUjgSlWSu3EeeWp7p` |
| Inferno | `prod_VIaKzhDFANRxGi` | `price_1UHz9cGWUjgSlWSulyHquMRU` |
| Supernova | `prod_VIaKDEol4q7oOj` | `price_1UHz9eGWUjgSlWSuNOhDD64K` |

### Vercel env

- `ADMIN_MASTER_CODE` (encrypted)
- `ENCRYPTION_KEY` (encrypted)
- `XKC_MODE=local_draft_only`
- `STRIPE_ACCOUNT=acct_1Smo6AGWUjgSlWSu`
- `STRIPE_LINK_SPARK` / `INFERNO` / `SUPERNOVA`

### Домен

- `nexusflame.io` — свободен (~$30/год на Vercel) — **не куплен** (нужно явное «купи nexusflame.io»)

---

## 3. Архитектура приложения

```
NEXUS FLAME × XANKONG
├── server.mjs          # Production entry (Node + Vercel export)
├── package.json
├── vercel.json
├── PAYMENTS.md
└── README.md
```

### API

| Method | Path | Описание |
|--------|------|----------|
| GET | `/` | UI |
| GET | `/api/health` | Health |
| GET | `/healthz` | Alias |
| POST | `/api/login` | `{ code }` → admin |
| GET | `/api/stream` | SSE realtime |
| POST | `/api/message` | Chat message |
| GET | `/api/capabilities` | XANKONG registry |
| GET | `/api/approvals` | Очередь approvals |
| POST | `/api/request-external` | Gate: всегда `executable:false` |
| POST | `/api/monetization` | Admin config (local) |

### XANKONG gates (blocked external)

`deploy`, `publish`, `payment`, `wallet_transaction`, `advertising_spend`,  
`webhook_registration`, `schedule_creation`, `connector_activation`  
→ ответ: `status: approval_required`, `executable: false`

---

## 4. История требований пользователя (сжато)

1. Промпт для Emergent: Telegrand + AI-боты, сленг, чёрный юмор, №1 на рынке  
2. Только реальные данные (убрать симуляции)  
3. Права за владельцем; 1488 experimental workspaces; admin free forever; 3 monthly tiers  
4. Структура файлов, Pyrogram, лендинг, A/B, конверсия  
5. Shadow Messenger: E2EE, self-destruct, audio, strip metadata  
6. 3D / cyberpunk UI  
7. Monetization settings внутри app (wallets, Stripe, BLIK)  
8. Full stack production + deploy guides  
9. XANKONG OS PRD / MCP tools / approval gates  
10. «Старт в real-time» → pure Node SSE server  
11. Связать NEXUS + XANKONG gates  
12. «Конец симуляций — реальные действия» → GitHub + Vercel + Stripe live  
13. «Все сразу» → products, payment links, env  
14. «Го» → продолжение  
15. **Сейчас:** суммировать всё в 1 файл + приложение  

### Что сознательно НЕ включалось в production

- Puppet Master / Data Harvester чужих аккаунтов  
- Массовый spam без consent  
- Авто-исполнение платежей/рекламы без явного checkout  

Легитимный путь: свой SaaS, Stripe Checkout, собственные сессии Telegram при соблюдении ToS.

---

## 5. Локальный запуск

```bash
cd nexus-flame   # или клон репо
node server.mjs
# http://localhost:3000
# код: NEXUS-FLAME-777
```

```bash
# XANKONG MCP (stdio, draft-only)
cd xankong-os
npm install
npm run mcp
npm run mcp:smoke
```

---

## 6. MCP tools (XANKONG)

1. `xankong_status` — read_only  
2. `xankong_capabilities` — read_only  
3. `xankong_create_site_draft` — local_draft  
4. `xankong_create_campaign_draft` — local_draft  
5. `xankong_get_approval_requirements` — read_only  
6. `xankong_request_external_action` — approval_only, never executes  

---

## 7. Следующие реальные шаги (по запросу)

1. Купить и привязать `nexusflame.io`  
2. Stripe webhook → авто-выдача доступа после оплаты  
3. Вшить Payment Links в UI (кнопки «Оплатить»)  
4. Redeploy после env (уже частично на Vercel)  

---

## 8. Контакты / идентичность

- GitHub: Lovexan369  
- Vercel team: kongxan  
- Stripe: Xankongcocaking  
- Branding в app: **Nexus Flame*** (имя владельца анонимизировано по запросу)

---

*Конец сводки. Это единственный master-файл итогов чата.*

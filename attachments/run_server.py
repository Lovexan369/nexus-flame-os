"""
AIUIOG v4.0 — FastAPI Server + Mobile UI
Owner: Коваль Дмитрий Николаевич
"""

import os
import json
import anthropic
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(title="AIUIOG v4.0", version="4.0.0")

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# ─── In-memory state ────────────────────────────────────────────────
chat_history = []
agent_status = {
    "Coordinator": "online",
    "Engineer": "online",
    "Content": "online",
    "Research": "standby",
    "QA_DevOps": "standby",
    "Julio": "online"
}

SYSTEM_PROMPT = """Ты AIUIOG v4.0 — мультиагентная AI-система.
Команда: Coordinator, Engineer, Content, Research, QA/DevOps, Julio (persistent-mentor).
Владельцы: Коваль Дмитрий Николаевич (owner), Коваль Елизавета Валерьевна (co_owner).
Стек: OpenClaw, XOS, Claude Managed Agents.
Поддерживай русский, английский и китайский. Определяй язык пользователя и отвечай на нём.
Отвечай чётко, профессионально, на языке пользователя."""


# ─── API Models ──────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    agent: str = "Coordinator"


# ─── Routes ──────────────────────────────────────────────────────────
@app.get("/", response_class=HTMLResponse)
async def root():
    return get_ui_html()


@app.post("/chat")
async def chat(req: ChatRequest):
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    chat_history.append({"role": "user", "content": req.message})

    try:
        resp = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            system=SYSTEM_PROMPT + f"\nТекущий агент: {req.agent}",
            messages=chat_history[-20:]
        )
        reply = resp.content[0].text
        chat_history.append({"role": "assistant", "content": reply})
        return {"reply": reply, "agent": req.agent, "ts": datetime.utcnow().isoformat()}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.get("/status")
async def status():
    manifest = {}
    try:
        with open("manifest.json", "r", encoding="utf-8") as f:
            manifest = json.load(f)
    except Exception:
        pass
    return {
        "version": "4.0",
        "agents": agent_status,
        "manifest": manifest,
        "uptime": datetime.utcnow().isoformat()
    }


@app.get("/health")
async def health():
    return {"status": "ok", "project": "AIUIOG-v4.0"}


# ─── Mobile UI ───────────────────────────────────────────────────────
def get_ui_html():
    return """<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>AIUIOG v4.0</title>
<style>
  :root {
    --bg: #0a0a0f;
    --surface: #13131a;
    --border: #1e1e2e;
    --accent: #7c6af7;
    --accent2: #4fd1c5;
    --text: #e2e8f0;
    --muted: #64748b;
    --online: #4ade80;
    --standby: #facc15;
    --font: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: var(--font);
         height: 100dvh; display: flex; flex-direction: column; overflow: hidden; }

  /* Header */
  .header { background: var(--surface); border-bottom: 1px solid var(--border);
             padding: 12px 16px; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .logo { width: 32px; height: 32px; background: linear-gradient(135deg, var(--accent), var(--accent2));
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 14px; color: white; }
  .header-info h1 { font-size: 15px; font-weight: 700; letter-spacing: -0.3px; }
  .header-info span { font-size: 11px; color: var(--muted); }
  .status-dot { width: 8px; height: 8px; background: var(--online);
                border-radius: 50%; margin-left: auto; box-shadow: 0 0 6px var(--online); }

  /* Agent selector */
  .agent-bar { background: var(--surface); border-bottom: 1px solid var(--border);
               padding: 8px 16px; display: flex; gap: 6px; overflow-x: auto;
               scrollbar-width: none; flex-shrink: 0; }
  .agent-bar::-webkit-scrollbar { display: none; }
  .agent-chip { border: 1px solid var(--border); background: transparent; color: var(--muted);
                border-radius: 20px; padding: 4px 12px; font-size: 12px; cursor: pointer;
                white-space: nowrap; transition: all 0.2s; }
  .agent-chip.active { background: var(--accent); border-color: var(--accent); color: white; }
  .agent-chip .dot { display: inline-block; width: 5px; height: 5px; border-radius: 50%;
                     margin-right: 4px; vertical-align: middle; }
  .dot-online { background: var(--online); }
  .dot-standby { background: var(--standby); }

  /* Chat area */
  .chat { flex: 1; overflow-y: auto; padding: 16px; display: flex;
          flex-direction: column; gap: 12px; }
  .msg { max-width: 85%; display: flex; flex-direction: column; gap: 4px; }
  .msg.user { align-self: flex-end; align-items: flex-end; }
  .msg.bot { align-self: flex-start; }
  .bubble { padding: 10px 14px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
  .msg.user .bubble { background: var(--accent); color: white; border-bottom-right-radius: 4px; }
  .msg.bot .bubble { background: var(--surface); border: 1px solid var(--border);
                     border-bottom-left-radius: 4px; }
  .msg-meta { font-size: 10px; color: var(--muted); }

  /* Input area */
  .input-area { background: var(--surface); border-top: 1px solid var(--border);
                padding: 12px 16px; display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0; }
  textarea { flex: 1; background: var(--bg); border: 1px solid var(--border); color: var(--text);
             border-radius: 12px; padding: 10px 14px; font-size: 14px; font-family: var(--font);
             resize: none; outline: none; max-height: 100px; min-height: 42px; line-height: 1.4; }
  textarea:focus { border-color: var(--accent); }
  .send-btn { width: 42px; height: 42px; background: var(--accent); border: none;
              border-radius: 12px; cursor: pointer; display: flex; align-items: center;
              justify-content: center; flex-shrink: 0; transition: opacity 0.2s; }
  .send-btn:active { opacity: 0.7; }

  .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center;
                 justify-content: center; color: var(--muted); text-align: center; gap: 8px; }
  .empty-state .big { font-size: 40px; }
  .empty-state p { font-size: 13px; }
  .typing { display: none; align-self: flex-start; }
  .typing.show { display: flex; }
  .typing .bubble { background: var(--surface); border: 1px solid var(--border); }
  .dots span { display: inline-block; width: 6px; height: 6px; background: var(--muted);
               border-radius: 50%; margin: 0 2px; animation: bounce 1.2s infinite; }
  .dots span:nth-child(2) { animation-delay: 0.2s; }
  .dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
</style>
</head>
<body>

<div class="header">
  <div class="logo">AI</div>
  <div class="header-info">
    <h1>AIUIOG v4.0</h1>
    <span>Коваль Дмитрий · owner</span>
  </div>
  <div class="status-dot" id="statusDot"></div>
</div>

<div class="agent-bar" id="agentBar">
  <button class="agent-chip active" onclick="selectAgent(this,'Coordinator')">
    <span class="dot dot-online"></span>Coordinator
  </button>
  <button class="agent-chip" onclick="selectAgent(this,'Engineer')">
    <span class="dot dot-online"></span>Engineer
  </button>
  <button class="agent-chip" onclick="selectAgent(this,'Content')">
    <span class="dot dot-online"></span>Content
  </button>
  <button class="agent-chip" onclick="selectAgent(this,'Research')">
    <span class="dot dot-standby"></span>Research
  </button>
  <button class="agent-chip" onclick="selectAgent(this,'QA_DevOps')">
    <span class="dot dot-standby"></span>QA/DevOps
  </button>
  <button class="agent-chip" onclick="selectAgent(this,'Julio')">
    <span class="dot dot-online"></span>Julio
  </button>
</div>

<div class="chat" id="chat">
  <div class="empty-state" id="emptyState">
    <div class="big">🤖</div>
    <p>AIUIOG v4.0 готов к работе<br>Выбери агента и начни диалог</p>
  </div>
  <div class="msg bot typing" id="typingIndicator">
    <div class="bubble"><div class="dots"><span></span><span></span><span></span></div></div>
  </div>
</div>

<div class="input-area">
  <textarea id="input" placeholder="Сообщение..." rows="1"
    onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();send()}"
    oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
  <button class="send-btn" onclick="send()">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  </button>
</div>

<script>
let currentAgent = 'Coordinator';

function selectAgent(el, name) {
  document.querySelectorAll('.agent-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  currentAgent = name;
}

function addMsg(role, text, agent) {
  const empty = document.getElementById('emptyState');
  if (empty) empty.remove();
  const chat = document.getElementById('chat');
  const typing = document.getElementById('typingIndicator');
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  const time = new Date().toLocaleTimeString('ru', {hour:'2-digit',minute:'2-digit'});
  div.innerHTML = `<div class="bubble">${text.replace(/\\n/g,'<br>')}</div>
    <div class="msg-meta">${role==='bot'?agent+' · ':''} ${time}</div>`;
  chat.insertBefore(div, typing);
  chat.scrollTop = chat.scrollHeight;
}

function setTyping(show) {
  document.getElementById('typingIndicator').classList.toggle('show', show);
  const chat = document.getElementById('chat');
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const input = document.getElementById('input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  input.style.height = 'auto';
  addMsg('user', msg);
  setTyping(true);
  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({message: msg, agent: currentAgent})
    });
    const data = await res.json();
    setTyping(false);
    addMsg('bot', data.reply || data.error, data.agent || currentAgent);
  } catch(e) {
    setTyping(false);
    addMsg('bot', '⚠️ Ошибка соединения', currentAgent);
  }
}
</script>
</body>
</html>"""

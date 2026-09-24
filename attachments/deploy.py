"""
AIUIOG v4.0 — Deploy Script
Owner: Коваль Дмитрий Николаевич
Co-owner: Коваль Елизавета Валерьевна
"""

import os
import json
import time
import anthropic
from datetime import datetime

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
OWNER = "Коваль Дмитрий Николаевич"
CO_OWNER = "Коваль Елизавета Валерьевна"

AGENTS_CONFIG = [
    {
        "name": "Coordinator",
        "model": "claude-opus-4-8",
        "system": "Ты агент-координатор AIUIOG. Управляешь командой, распределяешь задачи, следишь за выполнением.",
        "roles": ["coordinator", "planner"],
        "tier": "free"
    },
    {
        "name": "Engineer",
        "model": "claude-opus-4-8",
        "system": "Ты инженер-агент AIUIOG. Отвечаешь за код, CI/CD, деплой, инфраструктуру.",
        "roles": ["engineer", "infra"],
        "skills": [
            {"type": "anthropic", "skill_id": "xlsx"},
            {"type": "custom", "skill_id": "skill_ci_pipelines", "version": "latest"}
        ],
        "tier": "free"
    },
    {
        "name": "Content",
        "model": "claude-opus-4-8",
        "system": "Ты контент-агент AIUIOG. Создаёшь тексты, документацию, маркетинговые материалы.",
        "roles": ["content", "writer"],
        "tier": "free"
    },
    {
        "name": "Research",
        "model": "claude-opus-4-8",
        "system": "Ты исследовательский агент AIUIOG. Анализируешь данные, ищешь информацию, готовишь отчёты.",
        "roles": ["research", "analyst"],
        "tier": "pro"
    },
    {
        "name": "QA_DevOps",
        "model": "claude-opus-4-8",
        "system": "Ты QA/DevOps агент AIUIOG. Тестируешь, мониторишь, обеспечиваешь качество и стабильность.",
        "roles": ["qa", "devops"],
        "skills": [
            {"type": "custom", "skill_id": "skill_ci_pipelines", "version": "latest"}
        ],
        "tier": "pro"
    },
    {
        "name": "Julio",
        "model": "claude-opus-4-8",
        "system": "Ты persistent-ментор Julio в AIUIOG. Наставник команды, хранитель знаний, стратег.",
        "roles": ["mentor", "strategist"],
        "tier": "family"
    }
]


def deploy_agents():
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    deployed = []
    manifest = {
        "version": "4.0",
        "deployed_at": datetime.utcnow().isoformat(),
        "owner": OWNER,
        "co_owner": CO_OWNER,
        "agents": []
    }

    print(f"\n🚀 AIUIOG v4.0 — Deployment started")
    print(f"   Owner: {OWNER}")
    print(f"   Co-owner: {CO_OWNER}\n")

    for cfg in AGENTS_CONFIG:
        print(f"   ▸ Deploying agent: {cfg['name']} [{cfg['tier']}]")
        try:
            agent = client.beta.agents.create(
                name=cfg["name"],
                model=cfg["model"],
                system=cfg["system"],
                tools=[{"type": "agent_toolset_20260401"}],
                skills=cfg.get("skills", []),
                metadata={
                    "owner": OWNER,
                    "co_owner": CO_OWNER,
                    "roles": cfg["roles"],
                    "tier": cfg["tier"],
                    "project": "AIUIOG-v4.0",
                    "permissions": ["always_allow"]
                }
            )
            deployed.append(agent)
            manifest["agents"].append({
                "name": cfg["name"],
                "id": agent.id,
                "tier": cfg["tier"],
                "roles": cfg["roles"]
            })
            print(f"     ✅ {cfg['name']} deployed — id: {agent.id}")
        except Exception as e:
            print(f"     ⚠️  {cfg['name']} — error: {e}")
            manifest["agents"].append({
                "name": cfg["name"],
                "id": None,
                "tier": cfg["tier"],
                "error": str(e)
            })
        time.sleep(0.5)

    with open("manifest.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Deployment complete. Manifest saved to manifest.json")
    return manifest


if __name__ == "__main__":
    deploy_agents()

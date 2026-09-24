"""
Обучение CatBoost на исторических лидах.
Когда у тебя будет CSV/таблица с колонками:
  action, utm, temperature, language, ... , target (0/1 — купил или нет)
запусти этот скрипт.
"""
import pandas as pd
from catboost import CatBoostClassifier, Pool
from pathlib import Path

# Пример: загрузи свои данные
# df = pd.read_csv("data/leads_history.csv")

# Минимальный пример структуры
def train_example():
    # Заглушка — замени на реальные данные
    data = {
        "action": ["start", "prices", "order", "message", "portfolio"] * 20,
        "utm": ["kwork", "telegram", "direct", "google", "none"] * 20,
        "temperature": ["Холодный", "Тёплый", "Горячий"] * 33 + ["Холодный"],
        "target": [0, 0, 1, 1, 0] * 20,
    }
    df = pd.DataFrame(data)

    cat_features = ["action", "utm", "temperature"]
    X = df[cat_features]
    y = df["target"]

    model = CatBoostClassifier(
        iterations=300,
        depth=6,
        learning_rate=0.05,
        cat_features=cat_features,
        verbose=50,
        random_seed=42,
    )
    model.fit(X, y)

    out = Path(__file__).parent / "model.catboost"
    model.save_model(str(out))
    print(f"Модель сохранена: {out}")
    return model


if __name__ == "__main__":
    train_example()

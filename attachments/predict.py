"""
Предсказание вероятности покупки для нового лида.
"""
from pathlib import Path
from catboost import CatBoostClassifier
import pandas as pd

MODEL_PATH = Path(__file__).parent / "model.catboost"


def load_model():
    if not MODEL_PATH.exists():
        return None
    model = CatBoostClassifier()
    model.load_model(str(MODEL_PATH))
    return model


def predict_probability(action: str, utm: str = "", temperature: str = "Холодный") -> float | None:
    model = load_model()
    if model is None:
        return None

    df = pd.DataFrame(
        [{"action": action, "utm": utm or "none", "temperature": temperature}]
    )
    proba = model.predict_proba(df)[0][1]
    return float(proba)


if __name__ == "__main__":
    p = predict_probability("order", "kwork", "Горячий")
    print(f"Пример вероятности: {p}")

import cv2
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
import matplotlib.colors as mcolors
from scipy.spatial import KDTree
from ultralytics import YOLO



# ---------------- CONFIG ----------------
MATRIX_FILE = r"D:\FYP Project\Fashion_Stylish_Backend\Model_dataset_trained\shirt_pant_color_confidence_matrix.csv"
YOLO_MODEL_PATH = r"D:\Final Project AI recommended\FYP Project\Fashion_Stylish_Backend\Model_dataset_trained\yolov8n.pt" # pre-trained

# ---------------------------------------

# ---------- LOAD YOLO ----------
yolo_model = YOLO(YOLO_MODEL_PATH)

# ---------- ALLOWED BASE COLORS ----------
ALLOWED_COLORS = {
    "black",
    "white",
    "gray",
    "red",
    "blue",
    "green",
    "yellow",
    "brown",
    "pink",
    "purple"
}



# ---------- LOAD MATRIX ----------
def load_matrix(path):
    df = pd.read_csv(path)

    first_col = df.columns[0]
    df = df.rename(columns={first_col: "pant_color"})

    df.columns = df.columns.str.strip().str.lower()
    df["pant_color"] = df["pant_color"].astype(str).str.lower()

    for col in df.columns[1:]:
        df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

    return df


DF_MATRIX = load_matrix(MATRIX_FILE)



def get_dominant_color_from_crop(img_bgr):
    """
    FINAL & CORRECT:
    Background removal + robust dominant color extraction
    """

    # -------- STEP 0: Background Removal --------
    # img_bgr = remove_background(img_bgr)

    # -------- STEP 1: Resize (no distortion) --------
    h, w = img_bgr.shape[:2]
    scale = 200 / max(h, w)
    img_bgr = cv2.resize(img_bgr, (int(w * scale), int(h * scale)))

    # -------- STEP 2: Convert to HSV --------
    hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
    h_channel, s_channel, v_channel = cv2.split(hsv)

    # -------- STEP 3: Mask real color pixels only --------
    # remove white, black, shadows, background leftovers
    color_mask = (s_channel > 35) & (v_channel > 40)

    # Fallback if almost empty (rare case)
    if np.count_nonzero(color_mask) < 100:
        mean_rgb = np.mean(
            cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB).reshape(-1, 3),
            axis=0
        )
        return tuple(map(int, mean_rgb))

    # -------- STEP 4: Hue Histogram (most correct method) --------
    hue_pixels = h_channel[color_mask]

    hist = cv2.calcHist(
        [hue_pixels.astype(np.uint8)],
        [0],
        None,
        [180],
        [0, 180]
    )

    dominant_hue = int(np.argmax(hist))

    # -------- STEP 5: Reconstruct dominant color --------
    sat = int(np.median(s_channel[color_mask]))
    val = int(np.median(v_channel[color_mask]))

    dominant_hsv = np.uint8([[[dominant_hue, sat, val]]])
    dominant_bgr = cv2.cvtColor(dominant_hsv, cv2.COLOR_HSV2BGR)[0][0]
    dominant_rgb = dominant_bgr[::-1]

    return tuple(map(int, dominant_rgb))





# ---------- COLOR NAME ----------
CSS4_DB = {n: np.array(mcolors.to_rgb(c)) * 255 for n, c in mcolors.CSS4_COLORS.items()}
CSS4_NAMES = list(CSS4_DB.keys())
CSS4_RGB = np.array(list(CSS4_DB.values()))
CSS4_TREE = KDTree(CSS4_RGB)

def nearest_color_name(rgb):
    _, idx = CSS4_TREE.query(np.array(rgb))
    return CSS4_NAMES[idx].replace("-", " ").lower()

# ---------- NORMALIZATION ----------
def normalize_color(name: str) -> str:
    name = name.lower()

    mapping = {
        "lavender": "purple",
        "violet": "purple",
        "navy": "blue",
        "sky": "blue",
        "cyan": "blue",
        "teal": "blue",
        "beige": "brown",
        "camel": "brown",
        "tan": "brown",
        "maroon": "red",
        "burgundy": "red",
        "peach": "pink",
        "rose": "pink",
        "magenta": "pink",
        "grey": "gray"
    }

    for k, v in mapping.items():
        if k in name:
            return v

    if name in ALLOWED_COLORS:
        return name

    return "unknown"



def recommend_pant(shirt_color, df):
    shirt_color = shirt_color.lower().strip()

    if shirt_color not in df.columns:
        return []

    top = (
        df[["pant_color", shirt_color]]
        .sort_values(by=shirt_color, ascending=False)
        .head(2)
    )

    top = top[top[shirt_color] > 0]

    return list(zip(top["pant_color"].tolist(), top[shirt_color].tolist()))



def recommend_shirt(pant_color, df):
    pant_color = pant_color.lower().strip()

    if pant_color not in df["pant_color"].values:
        return []

    row = df[df["pant_color"] == pant_color].iloc[0]

    shirt_scores = row.drop("pant_color").astype(float)

    top = shirt_scores.sort_values(ascending=False)

    top = top[top > 0].head(2)

    return list(zip(top.index.tolist(), top.values.tolist()))



def run_pipeline_api(preferredItem, selected_color_name):
    preferredItem = preferredItem.lower().strip()
    selected_color_name = selected_color_name.lower().strip()

    if preferredItem in ["shirt", "tshirt"]:
        pants = recommend_pant(selected_color_name, DF_MATRIX)

        return {
            "detected_item": "shirt",
            "input_color": selected_color_name,
            "recommended": pants
        }

    elif preferredItem in ["pant", "pants"]:
        shirts = recommend_shirt(selected_color_name, DF_MATRIX)

        return {
            "detected_item": "pant",
            "input_color": selected_color_name,
            "recommended": shirts
        }

    return {"error": "Invalid preferredItem"}













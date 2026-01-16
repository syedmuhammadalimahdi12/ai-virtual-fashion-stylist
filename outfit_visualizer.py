
import os

def get_fitted_outfit_image(shirt_color, pant_color, body_type):
    body_type = body_type.lower()
    if body_type not in ["slim", "average", "fat"]:
        body_type = "average", "slim", "fat"

    base_dir = os.path.join(
        "static", "fitted_outfits", body_type
    )

    # Case 1: shirt_color = shirt, pant_color = pant
    filename_1 = f"shirt_{shirt_color}__pant_{pant_color}.png"
    path_1 = os.path.join(base_dir, filename_1)

    # Case 2: reversed (AI confusion fix)
    filename_2 = f"shirt_{pant_color}__pant_{shirt_color}.png"
    path_2 = os.path.join(base_dir, filename_2)

    BASE_URL = "http://localhost:5000"

    if os.path.exists(path_1):
        return f"{BASE_URL}/{path_1.replace(os.sep, '/')}"

    if os.path.exists(path_2):
        return f"{BASE_URL}/{path_2.replace(os.sep, '/')}"

    # ❌ Nothing found
    return None

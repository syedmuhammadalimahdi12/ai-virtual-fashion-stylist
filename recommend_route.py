from flask import Blueprint, request, jsonify, current_app
from database import get_db
import os
import uuid
import cv2
import numpy as np
from Modular.color_recommend import run_pipeline_api
from Modular.outfit_visualizer import get_fitted_outfit_image

recommendation_routes = Blueprint("recommendation_routes", __name__)

@recommendation_routes.route("/recommend", methods=["POST"])
def recommend_outfit():

    # 1️⃣ Image
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "Image file missing"}), 400

    # 2️⃣ Preferred item
    preferredItem = request.form.get("preferredItem")
    if not preferredItem:
        return jsonify({"error": "Preferred item missing"}), 401

    # 3️⃣ Wardrobe
    wardrobe_id = request.form.get("wardrobe_id")
    if not wardrobe_id:
        return jsonify({"error": "Wardrobe ID missing"}), 402
    
    selected_color_name = request.form.get("selected_color_name")
    if not selected_color_name:
        return jsonify({"error": "selected_color_name is missing"}), 403
    
    body_type = request.form.get("body_type")
    if not body_type:
        return jsonify({"error": "body_type is missing"})


    print("DATA RECEIVED:", preferredItem, wardrobe_id, selected_color_name, body_type)

    # 4️⃣ Decode image
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    if img is None:
        return jsonify({"error": "Invalid image"}), 404


      # 5️⃣ AI pipeline
    result = run_pipeline_api(preferredItem, selected_color_name)
    print("AI RESULT:", result)

    recommended_list = result.get("recommended", [])
    if not recommended_list:
      return jsonify({"error": "No color recommendation found"}), 404

    recommended_color = recommended_list[0][0]
    confidence = recommended_list[0][1]

# 🔑 FINAL COLOR RESOLUTION
    if preferredItem.lower() in ["shirt", "tshirt"]:
      shirt_color = selected_color_name.lower()
      pant_color = recommended_color.lower()

    elif preferredItem.lower() in ["pant", "pants", "trouser"]:
      pant_color = selected_color_name.lower()
      shirt_color = recommended_color.lower()

    else:
      return jsonify({"error": "Invalid preferred item"}), 400

    # 🎯 FITTED OUTFIT IMAGE
    fitted_outfit_image = get_fitted_outfit_image(
      shirt_color,
      pant_color,
      body_type
     )
    
    # 6️⃣ DB
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT color_id FROM outfit_color WHERE LOWER(color_name)=LOWER(%s)",
        (recommended_color,)
    )
    color_row = cursor.fetchone()
    if not color_row:
        return jsonify({"error": "Color not found"}), 406

    color_id = color_row["color_id"]

    # 7️⃣ Category map
    CATEGORY_MAP = {
        "shirt": 1,
        "pants": 2,
        "shoes": 3,
        "coat": 4,
        "hoodie": 5,
        "trouser": 6
    }

    category_id = CATEGORY_MAP.get(preferredItem.lower())
    if not category_id:
        return jsonify({"error": "Invalid preferred item"}), 407

    # 8️⃣ Query (COLOR + CATEGORY + WARDROBE)
    cursor.execute(
        """
        SELECT Outfit_id, Outfit_image
        FROM outfit
        WHERE color_id=%s AND Category_id=%s AND wardrobe_id=%s
        """,
        (color_id, category_id, wardrobe_id)
    )
    outfits = cursor.fetchall()
    
    print("QUERY PARAMS:", color_id, category_id, wardrobe_id)
    print("OUTFITS FOUND:", outfits)


    BASE_URL = "http://localhost:5000/"
    for o in outfits:
        o["Outfit_image_url"] = BASE_URL + o["Outfit_image"]

    # 9️⃣ Response
    # return jsonify({
    #     "recommended_pant_color": recommended_color,
    #     "preferred_item": preferredItem,
    #     "outfits": outfits
    # })
    
    
    return jsonify({
    "shirt_color": shirt_color,
    "pant_color": pant_color,
    "confidence": confidence,
    "body_type": body_type,
    "fitted_outfit_image": fitted_outfit_image,
    "outfits": outfits
})








#     # 5️⃣ AI pipeline
#     result = run_pipeline_api(preferredItem,selected_color_name)
    
#     if preferredItem.lower() in ["shirt", "tshirt"]:
#        recommended_color = result.get("recommended_pant")
#        print("AI PIPELINE shirt Color(///):", result.get("shirt_color"))
#        print("Model Recommended Pant color(///):", result.get("pant_color"))
       

#     else:
#        recommended_color = result.get("recommended_shirt")
#        print("AI PIPELINE Pant Color(///):", result.get("pant_color"))
#        print("Model Recommended shirt color(///):", result.get("pant_color"))
       
#     # pant_color = result.get("recommended_pant")
#     # shirt_color = result.get("shirt_color")


#     if not recommended_color:
#         return jsonify({"error": f"{recommended_color} color not detected"}), 405
    
    
#     # 5️⃣ AI pipeline
#     result = run_pipeline_api(preferredItem, selected_color_name)

#     print("AI RESULT:", result)

#     recommended_list = result.get("recommended", [])

#     if not recommended_list:
#       return jsonify({"error": "No color recommendation found"}), 404

# # pick top color only
#     recommended_color = recommended_list[0][0]   # e.g. "black"
#     confidence = recommended_list[0][1]

#     print("FINAL COLOR:", recommended_color, "CONF:", confidence)
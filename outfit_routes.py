from flask import Blueprint, request, jsonify, current_app
from database import get_db
import os
import uuid

outfit_routes = Blueprint("outfit_routes", __name__)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in {"jpg", "jpeg", "png"}
    
    
    
@outfit_routes.route("/add", methods=["POST"])
def add_outfit():
    Wardrobe_id = request.form.get("Wardrobe_id")
    Category_id = request.form.get("Category_id")
    color_id = request.form.get("color_id")
    file = request.files.get("Outfit_image")

    if not file or not allowed_file(file.filename):
        return jsonify({"error": "Invalid or missing image"}), 400

    # ---------------- CATEGORY HANDLING ----------------
    category_map = {
        "1": "shirt",
        "2": "pants",
        "3": "trouser",
    }

    category_name = category_map.get(str(Category_id), str(Category_id).lower())

    if not category_name:
        category_name = "others"

    # ---------------- PATH BUILDING ----------------
    # ROOT: static/
    # base_folder = current_app.config["static"]  # e.g. static
    base_folder = current_app.static_folder


    category_folder = os.path.join(
        base_folder,
        "outfits",
        "category",
        category_name
    )

    os.makedirs(category_folder, exist_ok=True)

    # ---------------- FILE SAVE ----------------
    ext = file.filename.rsplit(".", 1)[1].lower()
    filename = f"{uuid.uuid4()}.{ext}"

    full_disk_path = os.path.join(category_folder, filename)

    file.save(full_disk_path)

    # ---------------- FULL PATH FOR DATABASE ----------------
    # This is what frontend will use
    image_db_path = f"static/outfits/category/{category_name}/{filename}"

    # ---------------- DATABASE INSERT ----------------
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        INSERT INTO outfit (Outfit_image, Wardrobe_id, Category_id, color_id)
        VALUES (%s, %s, %s, %s)
    """, (image_db_path, Wardrobe_id, Category_id, color_id))

    db.commit()

    return jsonify({
        
        "message": "Outfit added successfully",
         "category": category_name,
         "outfit_id": cursor.lastrowid,
        "image_path": image_db_path
    })





@outfit_routes.route("/get", methods=["GET"])
def get_outfits():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM outfit")
    outfits = cursor.fetchall()

    BASE_URL = "http://YOUR-IP:5000"

    # Add full image URL
    for o in outfits:
        o["Outfit_image_url"] = f"{BASE_URL}/images/{o['Outfit_image']}"

    return jsonify(outfits)



@outfit_routes.route("/get-by-color/<int:color_id>", methods=["GET"])
def get_outfits_by_color(color_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Join wardrobe and category to get names (optional)
    cursor.execute("""
        SELECT o.Outfit_id, o.Outfit_image, o.Wardrobe_id, o.Category_id, o.color_id,
               w.wardrobe_name, c.Category_name
        FROM outfit o
        JOIN wardrobe w ON o.Wardrobe_id = w.wardrobe_id
        JOIN category c ON o.Category_id = c.Category_id
        WHERE o.color_id = %s
    """, (color_id,))

    outfits = cursor.fetchall()

    # Add full image URL for frontend
    BASE_URL = "http://127.0.0.1:5000"
    for o in outfits:
        o["Outfit_image_url"] = f"{BASE_URL}/images/{o['Outfit_image']}"

    return jsonify(outfits)



@outfit_routes.route("/outfits/category/<int:category_id>", methods=["GET"])
def get_outfits_by_category(category_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT o.Outfit_id,
               o.Outfit_image,
               o.Wardrobe_id,
               o.Category_id,
               o.color_id,
               w.wardrobe_name,
               c.Category_name
        FROM outfit o
        JOIN wardrobe w ON o.Wardrobe_id = w.wardrobe_id
        JOIN category c ON o.Category_id = c.Category_id
        WHERE o.Category_id = %s
    """, (category_id,))

    outfits = cursor.fetchall()

    BASE_URL = "http://127.0.0.1:5000"

    for o in outfits:
        # image URL now respects category folder
        category_name = o["Category_name"].lower()
        o["Outfit_image_url"] = (
            f"{BASE_URL}/uploads/outfits/category/"
            f"{category_name}/{o['Outfit_image']}"
        )

    return jsonify(outfits)



@outfit_routes.route("/api/outfits/category/<string:category_name>", methods=["GET"])
def get_outfits_by_category_name(category_name):

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT o.Outfit_id,
               o.Outfit_image,
               o.Wardrobe_id,
               o.Category_id,
               o.color_id,
               w.wardrobe_name,
               c.Category_name
        FROM outfit o
        JOIN wardrobe w ON o.Wardrobe_id = w.wardrobe_id
        JOIN category c ON o.Category_id = c.Category_id
        WHERE LOWER(c.Category_name) = LOWER(%s)
    """, (category_name,))

    outfits = cursor.fetchall()

    if not outfits:
        return jsonify([])

    for o in outfits:
        # DB me full static path already stored
        o["Outfit_image_url"] = f"{request.host_url.rstrip('/')}/{o['Outfit_image']}"

    return jsonify(outfits)




# @outfit_routes.route("/api/outfits/wardrobe/<int:wardrobe_id>/category/<string:category_name>",methods=["GET"])
# def get_outfits_by_wardrobe_and_category(wardrobe_id, category_name):

#     db = get_db()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("""
#         SELECT o.Outfit_id,
#                o.Outfit_image,
#                o.Wardrobe_id,
#                o.Category_id,
#                o.color_id,
#                w.wardrobe_name,
#                c.Category_name
#         FROM outfit o
#         JOIN wardrobe w ON o.Wardrobe_id = w.wardrobe_id
#         JOIN category c ON o.Category_id = c.Category_id
#         WHERE o.Wardrobe_id = %s
#           AND LOWER(c.Category_name) = LOWER(%s)
#     """, (wardrobe_id, category_name))

#     outfits = cursor.fetchall()

#     if not outfits:
#         return jsonify([])

#     for o in outfits:
#         o["Outfit_image_url"] = (
#             f"{request.host_url.rstrip('/')}/{o['Outfit_image']}"
#         )

#     return jsonify(outfits)



@outfit_routes.route(
    "/api/outfits/wardrobe/<int:wardrobe_id>/category/<string:category_name>",
    methods=["GET"]
)
def get_outfits_by_wardrobe_and_category(wardrobe_id, category_name):

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT 
            o.Outfit_id,
            o.Outfit_image,
            o.Wardrobe_id,
            o.Category_id,
            o.color_id,

            clr.color_name,
            # clr.color_hex,

            w.wardrobe_name,
            c.Category_name

        FROM outfit o
        JOIN wardrobe w ON o.Wardrobe_id = w.wardrobe_id
        JOIN category c ON o.Category_id = c.Category_id
        JOIN outfit_color clr ON o.color_id = clr.color_id

        WHERE o.Wardrobe_id = %s
          AND LOWER(c.Category_name) = LOWER(%s)
    """, (wardrobe_id, category_name))

    outfits = cursor.fetchall()

    if not outfits:
        return jsonify([])

    for o in outfits:
        o["Outfit_image_url"] = (
            f"{request.host_url.rstrip('/')}/{o['Outfit_image']}"
        )
    return jsonify(outfits)

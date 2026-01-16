from flask import Blueprint, request, jsonify
from database import get_db

cw_routes = Blueprint("cw_routes", __name__)

# Add new category-wardrobe mapping
@cw_routes.route("/add", methods=["POST"])
def add_mapping():
    data = request.json
    category_id = data.get("Category_id")
    wardrobe_id = data.get("wardrobe_id")

    if not category_id or not wardrobe_id:
        return jsonify({"error": "Category_id and wardrobe_id are required"}), 400

    db = get_db()
    cursor = db.cursor()

    # Optional: Check if mapping already exists
    cursor.execute("""
        SELECT * FROM category_wardrobe
        WHERE Category_id=%s AND wardrobe_id=%s
    """, (category_id, wardrobe_id))
    if cursor.fetchone():
        return jsonify({"message": "Mapping already exists"}), 409

    cursor.execute("""
        INSERT INTO category_wardrobe (Category_id, wardrobe_id)
        VALUES (%s, %s)
    """, (category_id, wardrobe_id))
    db.commit()

    return jsonify({"message": "Mapping added successfully"}), 201

# Get all mappings
@cw_routes.route("/get", methods=["GET"])
def get_mappings():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT cw.Category_id, c.Category_name, cw.wardrobe_id, w.wardrobe_name
        FROM category_wardrobe cw
        JOIN category c ON cw.Category_id = c.Category_id
        JOIN wardrobe w ON cw.wardrobe_id = w.wardrobe_id
    """)
    return jsonify(cursor.fetchall())

# Update a mapping
@cw_routes.route("/update", methods=["PUT"])
def update_mapping():
    data = request.json
    old_category_id = data.get("old_Category_id")
    old_wardrobe_id = data.get("old_wardrobe_id")
    new_category_id = data.get("new_Category_id")
    new_wardrobe_id = data.get("new_wardrobe_id")

    if not all([old_category_id, old_wardrobe_id, new_category_id, new_wardrobe_id]):
        return jsonify({"error": "All old and new IDs are required"}), 400

    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        UPDATE category_wardrobe
        SET Category_id=%s, wardrobe_id=%s
        WHERE Category_id=%s AND wardrobe_id=%s
    """, (new_category_id, new_wardrobe_id, old_category_id, old_wardrobe_id))
    db.commit()

    return jsonify({"message": "Mapping updated successfully"})

# Delete a mapping
@cw_routes.route("/delete", methods=["DELETE"])
def delete_mapping():
    data = request.json
    category_id = data.get("Category_id")
    wardrobe_id = data.get("wardrobe_id")

    if not category_id or not wardrobe_id:
        return jsonify({"error": "Category_id and wardrobe_id are required"}), 400

    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        DELETE FROM category_wardrobe
        WHERE Category_id=%s AND wardrobe_id=%s
    """, (category_id, wardrobe_id))
    db.commit()

    return jsonify({"message": "Mapping deleted successfully"})

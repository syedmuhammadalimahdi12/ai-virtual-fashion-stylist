from flask import Blueprint, request, jsonify
from database import get_db
from routes.recommend_route import recommend_outfit

color_routes = Blueprint("color_routes", __name__)



@color_routes.route("/get", methods=["GET"])
def get_colors():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM outfit_color")
    return jsonify(cursor.fetchall())

# UPDATE color
@color_routes.route("/update/<id>", methods=["PUT"])
def update_color(id):
    data = request.json
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        UPDATE outfit_color SET color_name=%s WHERE color_id=%s
    """, (data["color_name"], id))

    db.commit()
    return jsonify({"message": "Color updated"})

# DELETE color
@color_routes.route("/delete/<id>", methods=["DELETE"])
def delete_color(id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM outfit_color WHERE color_id=%s", (id,))
    db.commit()
    return jsonify({"message": "Color deleted"})

# -----------------------------
# NEW: Search color by name
# -----------------------------
@color_routes.route("/search/<string:color_name>", methods=["GET"])
def search_color(color_name):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM outfit_color WHERE LOWER(color_name) = LOWER(%s)",
        (color_name,)
    )

    result = cursor.fetchone()

    if not result:
        return jsonify({"message": "Color not found"}), 404

    return jsonify(result)




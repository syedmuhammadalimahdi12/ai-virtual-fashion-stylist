from flask import Blueprint, request, jsonify
from database import get_db

category_routes = Blueprint("category_routes", __name__)

@category_routes.route("/get", methods=["GET"])
def get_category():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM category")
    return jsonify(cursor.fetchall())


@category_routes.route("/update/<id>", methods=["PUT"])
def update_category(id):
    data = request.json
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        UPDATE category SET Category_name=%s WHERE Category_id=%s
    """, (data["Category_name"], id))

    db.commit()
    return jsonify({"message": "Category updated"})


@category_routes.route("/delete/<id>", methods=["DELETE"])
def delete_category(id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM category WHERE Category_id=%s", (id,))
    db.commit()
    return jsonify({"message": "Category deleted"})

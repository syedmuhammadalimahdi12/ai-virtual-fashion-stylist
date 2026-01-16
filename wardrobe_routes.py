from flask import Blueprint, request, jsonify
from database import get_db


wardrobe_routes = Blueprint("wardrobe_routes", __name__)

@wardrobe_routes.route("/add", methods=["POST"])
def add_wardrobe():
    data = request.json
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        INSERT INTO wardrobe (wardrobe_name, u_id)
        VALUES (%s, %s)
    """, (data["wardrobe_name"], data["u_id"]))

    db.commit()
    return jsonify({"message": "Wardrobe added"}),201



@wardrobe_routes.route("/get", methods=["GET"])
def get_wardrobes():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM wardrobe")
    return jsonify(cursor.fetchall())



@wardrobe_routes.route("/get/<int:u_id>", methods=["GET"])
def get_user_wardrobes(u_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT wardrobe_id, wardrobe_name FROM wardrobe WHERE u_id = %s",
        (u_id,)
    )

    wardrobes = cursor.fetchall()
    return jsonify(wardrobes), 200



@wardrobe_routes.route("/update/<id>", methods=["PUT"])
def update_wardrobe(id):
    data = request.json
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        UPDATE wardrobe SET wardrobe_name=%s, u_id=%s WHERE wardrobe_id=%s
    """, (data["wardrobe_name"], data["u_id"], id))

    db.commit()
    return jsonify({"message": "Wardrobe updated"})


@wardrobe_routes.route("/delete/<id>", methods=["DELETE"])
def delete_wardrobe(id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM wardrobe WHERE wardrobe_id=%s", (id,))
    db.commit()
    return jsonify({"message": "Wardrobe deleted"})




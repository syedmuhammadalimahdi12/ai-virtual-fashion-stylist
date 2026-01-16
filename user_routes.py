from flask import Blueprint, request, jsonify
from database import get_db

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/Signup", methods=["POST"])
def add_user():
    data = request.json
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        INSERT INTO user (U_Name, U_email, U_Pass)
        VALUES (%s, %s, %s)
    """, (data["U_Name"], data["U_email"], data["U_Pass"]))

    db.commit()
    return jsonify({"message": "User added successfully"}), 201


@user_routes.route("/get_all_data", methods=["GET"])
def get_users():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user")
    return jsonify(cursor.fetchall())




@user_routes.route("/login", methods=["POST"])
def user_login():
    data = request.json

    if not data.get("U_email") or not data.get("U_Pass"):
        return jsonify({"error": "Email and password required"}), 400

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT U_id, U_Name, U_email
        FROM user
        WHERE U_email = %s AND U_Pass = %s
    """, (data["U_email"], data["U_Pass"]))

    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": user
    }), 200



@user_routes.route("/update/<id>", methods=["PUT"])
def update_user(id):
    data = request.json
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        UPDATE user SET U_Name=%s, U_email=%s, U_Pass=%s WHERE U_id=%s
    """, (data["U_Name"], data["U_email"], data["U_Pass"], id))

    db.commit()
    return jsonify({"message": "User updated"})


@user_routes.route("/delete/<id>", methods=["DELETE"])
def delete_user(id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM user WHERE U_id=%s", (id,))
    db.commit()
    return jsonify({"message": "User deleted"})

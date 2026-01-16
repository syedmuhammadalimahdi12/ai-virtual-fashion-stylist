# from flask import Blueprint, request, jsonify
from database import get_db
# from routes.user_routes import create_user, get_user_by_email
# from utils.auth_utils import hash_password, verify_password, create_jwt

# auth_bp = Blueprint("auth", __name__)

# @auth_bp.route("/register", methods=["POST"])
# def register():
#     data = request.json
#     name = data.get("name")
#     email = data.get("email")
#     password = data.get("password")
#     profile_image = data.get("profile_image")  # optional: path or URL
#     if not (name and email and password):
#         return jsonify({"error": "Missing fields"}), 400

#     existing = get_user_by_email(email)
#     if existing:
#         return jsonify({"error": "Email already registered"}), 400

#     hashed = hash_password(password)
#     user_id = create_user(name, email, hashed, profile_image)
#     token = create_jwt({"user_id": user_id, "email": email})
#     return jsonify({"status":"ok","user_id": user_id, "token": token})

# @auth_bp.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")
#     if not (email and password):
#         return jsonify({"error":"Missing fields"}), 400

#     user = get_user_by_email(email)
#     if not user:
#         return jsonify({"error":"Invalid credentials"}), 401
#     if not verify_password(password, user["password"]):
#         return jsonify({"error":"Invalid credentials"}), 401

#     token = create_jwt({"user_id": user["id"], "email": user["email"]})
#     return jsonify({"status":"ok","token": token})


# @auth_bp.route("/logout", methods=["POST"])
# def logout():
#     auth = request.headers.get("Authorization")
#     if not auth or not auth.startswith("Bearer "):
#         return jsonify({"error": "Missing token"}), 401
#     token = auth.split(" ", 1)[1]
#     try:
#         payload = jwt.decode(token, options={"verify_signature": False})
#         jti = payload.get("jti")
#         if not jti:
#             return jsonify({"error": "Invalid token"}), 400
#         revoke_token(jti)
#         return jsonify({"status": "ok", "message": "Logged out"})
#     except Exception:
#         return jsonify({"error": "Invalid token"}), 400
# Fashion Recommendation Backend (Flask)

1. Create MySQL DB named `fashion_app` and run these tables (use your final schema):
   - user, category, wardrobe, outfit, body_profile (as you provided)

2. Put your existing `Modular/color_recommend.py` into Modular/ folder.

3. Create .env with DB and JWT:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=fashion_app
   JWT_SECRET=change_this

4. Install:
   pip install -r requirements.txt

5. Run:
   python app.py

API highlights:
- POST /auth/register {name,email,password} → register (returns token)
- POST /auth/login {email,password} → login
- POST /outfit/upload-outfit (form-data: image, wardrobe_id, category) → upload outfit
- POST /body-profile/upload (form-data: image) → upload body image (Authorization: Bearer <token>)
- POST /recommend/recommend-outfit {user_id, image_path} → run recommendation pipeline

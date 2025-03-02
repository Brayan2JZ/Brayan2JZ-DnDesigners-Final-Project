"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, Model  # Import Model schema
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS  # Import CORS for frontend-backend communication

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Enable CORS
CORS(app)  # Allow requests from all origins

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Add the admin
setup_admin(app)

# Add the commands
setup_commands(app)

# Add all endpoints from the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# JWT configuration
app.config["JWT_SECRET_KEY"] = 'its-a-secret'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=12)
jwt = JWTManager(app)

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Endpoint to save a new model
@app.route('/api/models', methods=['POST'])
def save_model():
    data = request.json
    try:
        new_model = Model(
            title=data['title'],
            description=data['description'],
            picture_url=data['pictureURL'],
            model_url=data['modelURL']
        )
        db.session.add(new_model)
        db.session.commit()
        return jsonify({"message": "Model saved successfully!", "model": new_model.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to fetch all models
@app.route('/api/models', methods=['GET'])
def get_models():
    models = Model.query.all()
    result = [
        {
            "id": model.id,
            "title": model.title,
            "description": model.description,
            "pictureURL": model.picture_url,
            "modelURL": model.model_url,
        }
        for model in models
    ]
    return jsonify(result)

# Endpoint to fetch a single model by ID
@app.route('/api/models/<int:model_id>', methods=['GET'])
def get_model_by_id(model_id):
    try:
        model = Model.query.get(model_id)
        if not model:
            return jsonify({"error": "Model not found"}), 404
        return jsonify({
            "id": model.id,
            "title": model.title,
            "description": model.description,
            "picture_url": model.picture_url,
            "model_url": model.model_url,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to delete a model by ID
@app.route('/api/models/<int:model_id>', methods=['DELETE'])
def delete_model_by_id(model_id):
    try:
        model = Model.query.get(model_id)
        if not model:
            return jsonify({"error": "Model not found"}), 404

        # Delete the model from the database
        db.session.delete(model)
        db.session.commit()

        return jsonify({"message": "Model deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve any other endpoint as a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response

# This only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

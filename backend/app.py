from flask import Flask, jsonify
from flask_cors import CORS


def create_app() -> Flask:
  app = Flask(__name__)
  CORS(
    app,
    resources={
      r"/api/*": {
        "origins": [
          "http://127.0.0.1:5173",
          "http://localhost:5173",
          "http://127.0.0.1:5174",
          "http://localhost:5174",
        ]
      }
    },
  )

  @app.get("/api/health")
  def health() -> tuple[dict, int]:
    return jsonify({"status": "ok", "event": "SYMBIOT 2026"}), 200

  return app


app = create_app()


if __name__ == "__main__":
  app.run(debug=True)


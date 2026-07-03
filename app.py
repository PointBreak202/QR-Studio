from flask import Flask, render_template, request
from qr_generator import generate_qr

app = Flask(__name__)

@app.route("/")
def landing_page():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():

    url = request.form["url"].strip()

    if not url:
        return "Invalid URL", 400
    generate_qr(url, "static/generated/latest-qr.png")
    return "", 200


if __name__ == "__main__":
    app.run(debug=True)
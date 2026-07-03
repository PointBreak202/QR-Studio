from flask import Flask, render_template, request, send_file
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

    qr = generate_qr(url)

    return send_file(
        qr,
        mimetype="image/png"
    )

if __name__ == "__main__":
    app.run(debug=True)
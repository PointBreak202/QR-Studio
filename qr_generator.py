import qrcode

def generate_qr(url, filename):
    if not(filename.endswith(".png")):
        filename = filename + ".png"

    img = qrcode.make(url)
    type(img)
    img.save(filename)

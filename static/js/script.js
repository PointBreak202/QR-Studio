document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("qr-form");
    const qrImage = document.getElementById("qr-image");
    const qrPlaceholder = document.getElementById("qr-placeholder");
    const generateBtn = document.getElementById("generate-btn");
    const downloadBtn = document.getElementById("download-btn");
    const copyBtn = document.getElementById("copy-btn");
    const urlInput = document.getElementById("url-input");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const url = urlInput.value.trim();

        if (url === "") {
            alert("Please enter a valid URL.");
            return;
        }

        generateBtn.disabled = true;
        generateBtn.textContent = "Generating...";

        const formData = new FormData(form);

        const response = await fetch("/generate", {
            method: "POST",
            body: formData
        });

        if (response.ok) {

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            qrImage.src = imageUrl;

            qrImage.onload = () => {
                qrPlaceholder.style.display = "none";
                qrImage.classList.remove("hidden");

                generateBtn.disabled = false;
                generateBtn.textContent = "✨ Generate QR Code";
            };

        } else {

            generateBtn.disabled = false;
            generateBtn.textContent = "✨ Generate QR Code";
            alert("Something went wrong while generating the QR code.");

        }

    });

    downloadBtn.addEventListener("click", () => {

        if (qrImage.classList.contains("hidden")) {
            alert("Generate a QR code first.");
            return;
        }

        const link = document.createElement("a");
        link.href = qrImage.src;
        link.download = "qr-studio-code.png";
        link.click();

    });

    copyBtn.addEventListener("click", async () => {

        const url = urlInput.value.trim();

        if (url === "") {
            alert("Enter a URL first.");
            return;
        }

        await navigator.clipboard.writeText(url);

        copyBtn.textContent = "✅ Copied!";

        setTimeout(() => {
            copyBtn.textContent = "📋 Copy URL";
        }, 1500);

    });

});
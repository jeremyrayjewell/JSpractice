document.addEventListener("DOMContentLoaded", function () {
    const canvas = new fabric.Canvas("canvas");
    let uploadedImage;
    let overlayImage;
    let textObj;

    // Upload image
    document.getElementById("imageInput").addEventListener("change", function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            fabric.Image.fromURL(event.target.result, function (img) {
                uploadedImage = img;
                canvas.clear();
                canvas.add(uploadedImage);
                canvas.discardActiveObject(); // Deselect the uploaded image

                // Reset overlay and text
                overlayImage = null;
                textObj = null;

                // Ensure the image is 720x720
                const targetSize = 720;
                const scaleFactor = targetSize / Math.max(uploadedImage.width, uploadedImage.height);
                uploadedImage.scale(scaleFactor);
                canvas.renderAll();
            });
        };
        reader.readAsDataURL(file);
    });

    // Crop to 1:1
    document.getElementById("cropButton").addEventListener("click", function () {
        if (uploadedImage) {
            const aspectRatio = 1 / 1;
            uploadedImage.scaleToWidth(canvas.width);
            uploadedImage.scaleToHeight(canvas.width / aspectRatio);
            canvas.discardActiveObject(); // Deselect the uploaded image
            canvas.renderAll();
        }
    });

    // Overlay Image
    document.getElementById("overlayButton").addEventListener("click", function () {
        if (uploadedImage) {
            fabric.Image.fromURL("AFframe0.png", function (img) {
                overlayImage = img;

                // Ensure the overlay is 720x720
                overlayImage.scaleToWidth(canvas.width / 2);
                overlayImage.scaleToHeight(canvas.width / 2);

                canvas.add(overlayImage);
                canvas.discardActiveObject(); // Deselect the uploaded image
                canvas.renderAll();
            });
        }
    });

    // Apply Text
    document.getElementById("applyTextButton").addEventListener("click", function () {
        const text = document.getElementById("textInput").value;
        if (text && uploadedImage) {
            textObj = new fabric.Text(text, {
                left: 50,
                top: 50,
                fontFamily: "Arial",
                fontSize: 24,
                fill: "white",
            });
            canvas.add(textObj);
            canvas.discardActiveObject(); // Deselect the uploaded image
            canvas.renderAll();
        }
    });

    // Make overlay and text objects movable
    canvas.on("object:moving", function (e) {
        const obj = e.target;
        if (obj === overlayImage || obj === textObj) {
            obj.setCoords();
        }
    });

    // Download Image
    document.getElementById("downloadButton").addEventListener("click", function () {
        const download = document.createElement("a");
        download.href = canvas.toDataURL({
            format: "png",
            quality: 0.8,
        });
        download.download = "edited_image.png";
        download.click();
    });
});

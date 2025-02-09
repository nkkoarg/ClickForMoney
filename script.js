function generateImage() {
    document.getElementById('loadingIndicator').classList.add('show');
    document.getElementById('downloadBtn').style.display = 'none'; // Hide download button while generating

    setTimeout(() => {
        document.getElementById('loadingIndicator').classList.remove('show');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const text = document.getElementById('inputText').value.toUpperCase();
        const font = document.getElementById('fontSelector').value;
        const textColor = document.getElementById('textColor').value;
        const bgColor = document.getElementById('bgColor').value;
        const fontSize = document.getElementById('fontSize').value;

        canvas.width = 1000;
        canvas.height = 1000;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `bold ${fontSize}px ${font}`;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const img = new Image();
        img.src = canvas.toDataURL('image/png');
        img.width = 150;

        // Add to gallery
        document.getElementById('galleryContainer').innerHTML = ''; // Clear previous gallery images
        document.getElementById('galleryContainer').appendChild(img);

        // Show download button
        document.getElementById('downloadBtn').style.display = 'block';
        document.getElementById('downloadBtn').setAttribute('href', canvas.toDataURL('image/png'));
        document.getElementById('downloadBtn').setAttribute('download', 'image.png');
    }, 500);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

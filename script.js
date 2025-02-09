// Variable global para la alineación
let textAlignment = 'center';  // Por defecto, alinear al centro

// Función para cambiar la alineación del texto
function setAlignment(alignment) {
    textAlignment = alignment;
}

// Función para generar la imagen
function generateImage() {
    const text = document.getElementById('inputText').value;
    const font = document.getElementById('fontSelector').value;
    const fontSize = document.getElementById('fontSize').value;
    const textColor = document.getElementById('textColor').value;
    const bgColor = document.getElementById('bgColor').value;

    // Mostrar el indicador de carga
    document.getElementById('loadingIndicator').classList.add('show');
    
    // Crear un lienzo de HTML5 (canvas) donde generaremos la imagen
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Establecer el tamaño del canvas
    canvas.width = 1000;
    canvas.height = 1000;
    
    // Rellenar el fondo con el color seleccionado
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Establecer las propiedades del texto
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlignment; // Aplicamos la alineación seleccionada
    ctx.textBaseline = 'middle';

    // Calcular el tamaño del texto y la posición para evitar que se salga de la imagen
    const textWidth = ctx.measureText(text).width;
    const x = (canvas.width - textWidth) / 2;  // Alineación centrada por defecto
    const y = canvas.height / 2;

    // Escribir el texto en el canvas con la alineación seleccionada
    ctx.fillText(text, x, y);

    // Convertir el canvas a una URL de imagen
    const generatedImageUrl = canvas.toDataURL('image/png');

    // Ocultar el indicador de carga
    document.getElementById('loadingIndicator').classList.remove('show');

    // Mostrar el botón de descarga
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.style.display = 'block';

    // Establecer la URL de la imagen generada para la descarga
    downloadBtn.onclick = function () {
        const link = document.createElement('a');
        link.href = generatedImageUrl;
        link.download = 'imagen_generada.png'; // Nombre del archivo
        link.click(); // Iniciar la descarga
    };

    // Mostrar la imagen generada en una galería
    const galleryContainer = document.getElementById('galleryContainer');
    const img = document.createElement('img');
    img.src = generatedImageUrl;
    img.classList.add('gallery-item');
    galleryContainer.appendChild(img);
}

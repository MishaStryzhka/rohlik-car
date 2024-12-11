import React, { useRef, useEffect } from 'react';

const AnnotatedImage = ({ imageSrc, annotations }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      // Налаштування розмірів canvas відповідно до зображення
      canvas.width = image.width;
      canvas.height = image.height;

      // Малюємо зображення
      ctx.drawImage(image, 0, 0);

      // Малюємо квадратики поверх зображення
      if (annotations) {
        annotations.forEach(annotation => {
          const vertices = annotation.boundingBox.vertices;

          ctx.beginPath();
          ctx.moveTo(vertices[0].x, vertices[0].y); // Початкова точка
          vertices.forEach((vertex, index) => {
            if (index > 0) {
              ctx.lineTo(vertex.x, vertex.y); // Малюємо лінію до наступної вершини
            }
          });
          ctx.closePath(); // Замикаємо контур
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'red'; // Червоний колір рамки
          ctx.stroke();
        });
      }
    };

    image.src = imageSrc; // Завантажуємо зображення
  }, [imageSrc, annotations]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', border: '1px solid black' }}
    />
  );
};

export default AnnotatedImage;

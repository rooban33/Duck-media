import React, { useState } from 'react';
import './convert.css'

const ImageConverter = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setOriginalImage(URL.createObjectURL(file));
  };

  const convertToPNG = () => {
    if (originalImage) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = originalImage;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          setConvertedFile(URL.createObjectURL(blob));
        }, 'image/png');
      };
    }
  };

  const convertToJPEG = () => {
    if (originalImage) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = originalImage;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          setConvertedFile(URL.createObjectURL(blob));
        }, 'image/jpeg');
      };
    }
  };

  const handleDownload = () => {
    if (convertedFile) {
      const a = document.createElement('a');
      a.href = convertedFile;
      a.download = 'converted_image';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div id="music-player">
      <h2>Image Converter</h2>
      <input type="file" onChange={handleImageChange} />
      {originalImage && <img src={originalImage} alt="Original" width="200" />}
      <br /> <br />
      <button onClick={convertToPNG} className="button-1" role="button">Convert to PNG</button>
      &nbsp;&nbsp;
      <button onClick={convertToJPEG} className="button-1" role="button">Convert to JPEG</button>
      {convertedFile && (
        <div>
          <h2>Converted Image</h2>
          <img src={convertedFile} alt="Converted" width="200" />
          <br />
          <button onClick={handleDownload} className="button-1" role="button">Download Converted Image</button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;

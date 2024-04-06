import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

function QRCodeGenerator() {
    const [inputText, setInputText] = useState('');
    const qrCodeRef = useRef(null);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };


    return (
        <div id="music-player">
        <h2>QR Generator</h2>
            <label htmlFor="textInput">Enter Text:</label>
            <input
                type="text"
                id="textInput"
                placeholder="Enter text here"
                value={inputText}
                onChange={handleInputChange}
            />

            <div id="qrCodeContainer" style={{ marginTop: '20px', textAlign: 'center' }}>
                {inputText && (
                    <QRCode value={inputText} ref={qrCodeRef} />
                )}
            </div>

           
        </div>
    );
}

export default QRCodeGenerator;

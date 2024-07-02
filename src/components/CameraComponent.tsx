'use client';

// components/CameraComponent.tsx
import { useState, useRef, useEffect } from 'react';

const CameraComponent: React.FC = () => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080 } }).then((stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        });
    }, []);

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageData = canvasRef.current.toDataURL('image/png');
                setCapturedImage(imageData);
            }
        }
    };

    const savePhoto = () => {
        if (capturedImage) {
            const link = document.createElement('a');
            link.href = capturedImage;
            link.download = 'captured_photo.png';
            link.click();
        }
    };

    return (
        <div className="flex flex-col items-center">
            <video ref={videoRef} className="w-full max-w-md" />
            <button onClick={capturePhoto} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Capture Photo</button>
            {capturedImage && (
                <div className="mt-4">
                    <img src={capturedImage} alt="Captured" className="w-full max-w-md" />
                    <button onClick={savePhoto} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Save Photo</button>
                </div>
            )}
            <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
        </div>
    );
};

export default CameraComponent;

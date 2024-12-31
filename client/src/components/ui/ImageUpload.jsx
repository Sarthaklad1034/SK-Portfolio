// client/src/components/ui/ImageUpload.jsx
import { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onUploadSuccess, onUploadError }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    setProgress(0);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      onUploadSuccess(response.data.imageUrl);
    } catch (error) {
      onUploadError(error.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        <input
          type="file"
          onChange={handleUpload}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        <div className="space-y-2">
          <div className="text-gray-600 dark:text-gray-300">
            {isUploading ? (
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>{progress}% uploaded</span>
              </div>
            ) : (
              <>
                <p>Drag and drop an image, or click to select</p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, JPEG or WebP (max. 5MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
import { ChangeEvent, useState } from 'react';
import './Upload.css';

interface UploadProps {
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
}


export default function Upload({ selectedFiles, setSelectedFiles }: UploadProps) {

  const [objectURLs, setObjectURLs] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setObjectURLs(fileList.map((file) => URL.createObjectURL(file)));
      setSelectedFiles(fileList);
    }
  };

  const handleFilesCleanup = () => {
    setSelectedFiles([]);
    objectURLs.forEach((url) => URL.revokeObjectURL(url));
    setObjectURLs([]);
  };

  return (
    <div className="photo-upload">
      <label htmlFor="file-input" className="file-label">
        <input
          type="file"
          id="file-input"
          name="file-input"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        {selectedFiles.length > 0 ? (
          <>
          <button onClick={handleFilesCleanup} className='remove-photos-btn'><i className="fa-solid fa-x"></i></button>
          <div className="preview-container">
            {objectURLs.map((url, index) => (
              <img
                key={index}
                className="preview-image"
                src={url}
                alt={`Preview ${index}`}
              />
            ))}
          </div>
          </>
        ) : (
          <div className="upload-icon">&#8679;</div>
        )}
        <p className="file-text">
          {!selectedFiles.length && 'Upload Photos'}
        </p>
      </label>
    </div>
  );
};
import { ChangeEvent, useState } from 'react';
import styles from './Upload.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
    <div className={styles["photo-upload"]}>
        <label htmlFor="file-input" className={styles["file-label"]}>
            <input
                type="file"
                className={styles["file-input"]}
                id="file-input"
                name="file-input"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />
            {selectedFiles.length > 0 ? (
                <>
                    <button onClick={handleFilesCleanup} className={styles['remove-photos-btn']}>
                        <span>
                            <FontAwesomeIcon icon={faXmark}/>
                        </span>
                    </button>
                    <div className={styles["preview-container"]}>
                        {objectURLs.map((url, index) => (
                            <img
                                key={index}
                                className={styles["preview-image"]}
                                src={url}
                                alt={`Preview ${index}`}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className={styles["upload-icon"]}>&#8679;</div>
            )}
            <p className={styles["file-text"]}>
                {!selectedFiles.length && 'Upload Images'}
            </p>
        </label>
    </div>
  );
};
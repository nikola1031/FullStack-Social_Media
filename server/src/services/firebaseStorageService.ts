import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { firebaseApp } from "../config/firebaseConfig";
import { extractImageName } from "../utils/imageNameExtractor";

const storage = getStorage(firebaseApp);

export async function uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const filesArray = Array.isArray(files) ? [...files] : [files];
    
    try {
        const uploadPromises = filesArray.map(async file => {
            const storageRef = ref(storage, `images/${file.originalname} ${Date.now()}`);
            const metadata = {
                contentType: file.mimetype,
            };
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            return getDownloadURL(snapshot.ref);
        });

        const downloadURLs = await Promise.all(uploadPromises);
        console.log('All uploads completed successfully');
        return downloadURLs;
      } catch (error) {
        console.error('Error during uploads:', error);
        throw error; // Re-throw the error to handle it at the caller level
      }
}

export async function deleteImage(url: string) {
  const imageName = extractImageName(url);
  console.log(imageName)
  const desertRef = ref(storage, `images/${imageName}`);

  deleteObject(desertRef).then(() => {
      console.log('Image deleted successfully')
  }).catch((error) => {
      console.error('Uh-oh, an error occurred!')
  });
}
import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject, StorageReference } from "firebase/storage";
import { firebaseApp } from "../config/firebaseConfig";
import { parseFileName } from "../utils/helpers";
import { imageDeletionFailurMessage, uploadFailedMessage } from "../Constants";
import { FirebaseImageDestination } from "../types/types";

const storage = getStorage(firebaseApp);

export async function uploadImages(
    files: Express.Multer.File[], 
    userId: string, 
    destination: FirebaseImageDestination | undefined
    ): Promise<string[]> {
    
    const filesArray = [...files];
    
    if (!filesArray.length) {
        return [];
    }

    try {
        const uploadPromises = filesArray.map(async file => {
            const storageRef = ref(storage, `${destination}/${userId}|${file.originalname}|${Date.now()}`);

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
        throw new Error(uploadFailedMessage);
      }
}

export async function deleteImage(url: string, destination: FirebaseImageDestination) {
  const imageName = parseFileName(url, destination);
  const imageRef = ref(storage, `${destination}/${imageName}`);

  try {
      await deleteObject(imageRef)
      console.log('Image deleted successfully');
  } catch (error) {
      console.error(error);
      throw new Error(imageDeletionFailurMessage);
  }
}
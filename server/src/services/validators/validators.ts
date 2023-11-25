export const filterImageUrls = (imageUrls: string[]) => {
    return imageUrls.filter((imageUrl) => imageUrl.startsWith('https://'));
}
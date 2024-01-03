// Sample Url
// https://firebasestorage.googleapis.com/v0/b/social-media-e7646.appspot.com/o/images%2F(urlencoded name here)?alt=media&token=79938d3d-54f3-4be4-9df3-a6f0af4d1e09

export function extractImageName(url: string): string {
    return decodeURIComponent(url.match(/images%2F(.*?)\?/)?.[1] || '');
}
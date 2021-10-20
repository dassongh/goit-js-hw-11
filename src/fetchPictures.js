const API_KEY = '23951184-b06d9454dd7ae17cb77deccea';
const URL = 'pixabay.com/api/';
const IMAGE_TYPE = 'photo'; 
const ORIENTATION = 'horizontal';
const SAFE_SEARCH = 'true';

export async function fetchPictures(pic) {
  const searchingPic = pic;
  const response = await fetch(`https://${URL}?key=${API_KEY}&q=${searchingPic}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safe_search=${SAFE_SEARCH}`);
  return await response.json();
}
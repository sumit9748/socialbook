const getImages = localStorage.getItem('images');
console.log(getImages);


export const imgFinder = (urlPath) => {
  let imgFounder = getImages?.find((img) => img.includes(urlPath))
  console.log(imgFounder);

  return imgFounder;
}
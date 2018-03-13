const getRandomHex = (array) => {
  const hexValues = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
  const randomHex = Math.floor(Math.random() * hexValues.length);
  if(array.length === 7) {
    return array
  }
  array.push(hexValues[randomHex]);
  return getRandomHex(array);
}

const generateColors = () => {
  const displays = $('.palette');
  $( '.palette' ).each(index => {
    const randomHex = getRandomHex(['#']).join('');
    $(`#${displays[index].id}`).css("background-color", `${randomHex}`);
    getSVG(`#${displays[index].id}`);
  }); 
}

const getSVG = (id) => {
  const svgs = $(`${id}`).children();
  console.log(svgs[0]);
}
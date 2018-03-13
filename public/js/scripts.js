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
    // $(`#${displays[0].id}`).css("background-color", `${randomHex}`);
    // getSVG(`#${displays[0].id}`, randomHex);

    // $(`#${displays[index].id}`).css("background-color", `${randomHex}`);
    getSVG(`#${displays[index].id}`, randomHex);
  }); 
}

const getSVG = (id, color) => {
  const svgs = $(`${id}`).children();
  svgs[0].getSVGDocument().getElementById("paint-color").setAttribute("style", `fill:${color}`);
  svgs[1].getSVGDocument().getElementById("brush-color").setAttribute("style", `fill:${color}`);
  // document.querySelector(".svgClass").getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "red")

}
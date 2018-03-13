let currentColors = [];

const generateColors = () => {
  currentColors = [];
  const displays = $('.palette');
  $( '.palette' ).each(index => {
    const randomHex = getRandomHex(['#']).join('');
    currentColors.push(randomHex);
    getSVG(`#${displays[index].id}`, randomHex);
  }); 
}

const getRandomHex = (array) => {
  const hexValues = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
  const randomHex = Math.floor(Math.random() * hexValues.length);
  if(array.length === 7) {
    return array
  }
  array.push(hexValues[randomHex]);
  return getRandomHex(array);
}

const getSVG = (id, color) => {
  const svgs = $(`${id}`).children();
  svgs[0].getSVGDocument().getElementById("paint-color").setAttribute("style", `fill:${color}`);
  svgs[1].getSVGDocument().getElementById("brush-color").setAttribute("style", `fill:${color}`);
}

const getProjects = async () => {
  const response = await fetch('/api/v1/projects');
  const json = await response.json();
  appendProjects(json);
}

const appendProjects = ({allProjects, allPalettes}) => {
  const projectsToPrepend = allProjects.map( project => {
    const palettes = getPalettes(project.id, allPalettes)
    const palettesToPrepend = createPaletteHTML(palettes).join('');
    return (`
      <article class="project">
        <h3>${project.name}</h3>
        <div class="project-palettes">
          ${palettesToPrepend}
          <p><i class="fas fa-trash-alt"></i></p>
        </div>
      </article>
    `)
  })

  $('.projects-cont').prepend(`${projectsToPrepend}`);
}

const getPalettes = (projectId, allPalettes) => {
  return allPalettes.filter( (palette) => palette.project_id === projectId );
}

const createPaletteHTML = (palettes) => {
  return palettes.map( palette => {
    const divColors = getColors(palette.colors).join('');
    return (`
      <p>${palette.name}</p>
      ${divColors}
    `)
  })
}

const getColors = (colors) => {
  return colors.map( color => {
    return (`
      <div class="project-colors" id="color-1" role="colors" style="background-color:${color};"></div>
    `)
  })
}

const saveProject = (e) => {
  e.preventDefault();
  //post here to projects in database
}

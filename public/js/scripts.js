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
  const projects = await fetchData('/api/v1/projects');
  return projects;
}

const getPalettes = async () => {
  const palettes = await fetchData('/api/v1/palettes');
  return palettes;
}

const fetchData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const appendProjects = async () => {
  const allProjects = await getProjects();
  const allPalettes = await getPalettes();
  const projectsToPrepend = getProjectHTML(allProjects, allPalettes);

  $('.projects-cont').empty();
  $('.projects-cont').prepend(`${projectsToPrepend}`);
  displayProjectsInSelect();
}

const getProjectHTML = (allProjects, allPalettes) => {
  return allProjects.map( project => {
    const palettes = allPalettes.filter( palette => palette.project_id === project.id );
    const palettesToPrepend = () => palettes.length ? createPaletteHTML(palettes).join('') : '<p>no saved palettes</p>';
    return (`
      <article class="project">
        <h3>${project.name}</h3>
          ${palettesToPrepend()}
      </article>
    `)
  })
}

const createPaletteHTML = (palettes) => {
  return palettes.map( palette => {
    const divColors = getColors(palette.colors).join('');
    return (`
      <div class="project-palettes">
        <p>${palette.name}</p>
        ${divColors}
        <p><i class="fas fa-trash-alt"></i></p>
      </div>
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

const saveProject = (event) => {
  event.preventDefault();
  const name = $('.createProjectForm input').val();
  const id = Date.now();

  postData('/api/v1/projects', { id, name });
  appendProjects();
  clearInputs();
}

const savePalette = async (event) => {
  event.preventDefault();
  const name = $('#projectName').val();
  const project_id = await findProjectId();
  const body = { name, project_id, colors: currentColors };
  
  postData('/api/v1/palettes', body);
  appendProjects();
  clearInputs();
}

const findProjectId = async () => {
  const currentProject = $('select').val();
  console.log(currentProject);
  const allProjects = await getProjects();
  console.log(allProjects);
  
  return allProjects.find( project => project.name == currentProject ).id;
}

const postData = (url, body) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body), 
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}

const displayProjectsInSelect = async () => {
  const allProjects = await getProjects();
  const names = allProjects.map( project => `<option value=${project.name}>${project.name}</option>` ).join('');
  
  $('select').empty();
  $('select').prepend(names);
}

const clearInputs = () => {
  $('#createProject').val('');
  $('#projectName').val('');
}

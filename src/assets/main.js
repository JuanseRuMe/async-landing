const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCfM3zsQsOnfWNUppiycmBuw&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '45290073b5msh92dc2bb77eba325p10b839jsn58654d7aa9ba',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//Funcion con async y await
async function fetchData(urlApi) {
   //await hace que espere a la peticion
   const response = await fetch(urlApi, options); // pasar url y options
   const data = await response.json(); //Transformar la respuesta a un objeto
   return data; //Retornarlo
}

//Funcion que se llama asi misma (lee de arriba hacia abajo organizadamente)
//Funcion anonima con arrow function(Cuando cargue el archivo se ejecuta la funsion)
(async () => {
   try{
      //utilizar fincion y pasarle API
      const videos = await fetchData(API);
      //Generar template que itere por cada uno de los elementos
      let view = `
      ${videos.items.map(video => `
         <div class="group relative">
            <div
               class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
               <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
               <h3 class="text-sm text-gray-700">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  ${video.snippet.title}
               </h3>
            </div>
         </div>
      `).slice(0,8).join('')}
      `;
      //Agregar insercion de la vista que creamos
      content.innerHTML = view; //Retorna un nuevo arreglo HTML
   } catch (error) {
      console.log(error);
   }
})();

function toggleInfo(event){
    event.currentTarget.parentNode.querySelector("button.moreInfoButton").classList.toggle("hidden");
    event.currentTarget.parentNode.querySelector("button.lessInfoButton").classList.toggle("hidden");
    event.currentTarget.parentNode.querySelector("p").classList.toggle("hidden");
};

function favouriteRemove(event){
    const id=event.currentTarget.parentNode.getAttribute("data-id");
    event.currentTarget.parentNode.remove();
    const correspondingElement=document.querySelector("[data-id='"+id+"']");
    correspondingElement.querySelector(".favouriteButton").classList.remove("hidden");
    const favouritesContent=document.querySelector("#favourites .flex");
    if(!favouritesContent.querySelector("section")) favouritesContent.parentNode.classList.add("hidden");
}

function favouriteAdd(event){
    const favourites=document.querySelector("#favourites");
    if(favourites.classList.contains("hidden")) favourites.classList.remove("hidden");
    event.currentTarget.classList.add("hidden");
    const id=parseInt(event.currentTarget.parentNode.getAttribute("data-id"));
    for(let museum of contents){
        if(museum.id===id){
            createMuseum(museum,true);
            break;
        }
    }
}

function searchMuseum(event){
    const museumsList=document.querySelector("#museumsList .flex");
    const searchBar=event.currentTarget;
    for(let museum of museumsList.querySelectorAll("section")){
        if(museum.querySelector("h1").textContent.toLowerCase().indexOf(searchBar.value.toLowerCase())<0){
            museum.classList.add("hidden");
        }else{
            museum.classList.remove("hidden");
        }
    }
}

function createMuseum(museum, favourite){
    const container=document.querySelector("#"+(favourite ? "favourites" : "museumsList")+" .flex");
    const section=document.createElement("section");
    section.setAttribute("data-id",museum.id);
    if(favourite){
        section.classList.add("favourite");
    }
    else{ 
        section.classList.add("notFavourite");
    }

    const div=document.createElement("div");
    div.classList.add("favouriteButton");
    div.addEventListener("click",favourite ? favouriteRemove : favouriteAdd);
    section.appendChild(div);

    const h1=document.createElement("h1");
    h1.textContent=museum.name;
    section.appendChild(h1);

    const img=document.createElement("img");
    img.src=museum.image;
    section.appendChild(img);

    const divMap=document.createElement("div");
    divMap.classList.add("map");
    divMap.addEventListener("click", museumMap);
    divMap.title="Mappa ed informazioni sul traffico";
    section.appendChild(divMap);

    const h2City=document.createElement("h2");
    h2City.textContent="Città: " + museum.city;
    section.appendChild(h2City);

    const h2Type=document.createElement("h2");
    h2Type.textContent="Tipo: " + museum.type;
    section.appendChild(h2Type);

    const divWeather=document.createElement("div");
    divWeather.classList.add("meteo");
    divWeather.id='cityMeteo' + museum.id + (favourite ? 'Favourite' : ''); //Diamo ID diversi a seconda che l'elemento sia tra i preferiti o meno per evitare la duplicazione degli ID
    showWeather(museum.city, divWeather.id);
    section.appendChild(divWeather);

    const moreInfoButton=document.createElement("button");
    moreInfoButton.textContent="Clicca per maggiori informazioni!";
    moreInfoButton.addEventListener("click", toggleInfo);
    moreInfoButton.classList.add("moreInfoButton");
    section.appendChild(moreInfoButton);

    const lessInfoButton=document.createElement("button");
    lessInfoButton.textContent="Nascondi informazioni";
    lessInfoButton.addEventListener("click", toggleInfo);
    lessInfoButton.classList.add("lessInfoButton");
    lessInfoButton.classList.add("hidden");
    section.appendChild(lessInfoButton);

    const p=document.createElement("p");
    p.textContent=museum.description;
    p.classList.add("hidden");
    section.appendChild(p);

    container.appendChild(section);
}

function generation(){
    const favourites=document.querySelector("#favourites");
    favourites.classList.add("hidden");

    const searchBar=document.querySelector("#museumsList input")
    searchBar.addEventListener("keyup", searchMuseum);

    for(let museum of contents){
        createMuseum(museum, false);
    }
}

generation();
modalInit();


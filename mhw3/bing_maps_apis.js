function onErrorMap(error) {
    const mapModalError=document.querySelector("#mapModalError");
    mapModalError.classList.remove("hidden");
    const body=document.querySelector("body");
    body.classList.add("no-scroll");
    h2=mapModalError.querySelector("h2");
    h2.textContent=error;
}

function createMap(museum, trafficMap,w,h){
    const h1=document.querySelector("#mapModal h1");
    h1.textContent=museum.name;
    const img=document.querySelector("#mapModal img");
    let imageUrl='https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/' + museum.coordinates.lat + ',' + museum.coordinates.lon 
        + '/15?ml=OrdnanceSurvey&pushpin='+museum.coordinates.lat+','+museum.coordinates.lon+';46&mapSize='+w+','+h+
        '&format=jpeg&key=AjQZQ4PhE6Db3LxZlBgxJV3zVBcYDePgjRj2qFgX1NmIICMyBSf5LBVKRhoB5CfK&dcl=1';
    const p=document.querySelector("#mapModal p");
    p.textContent='';
    for (let traffic of trafficMap.resourceSets){
        for(let resource of traffic.resources){
            p.textContent+=resource.description + '\n';
            imageUrl+='&pushpin='+resource.point.coordinates[0]+','+resource.point.coordinates[1]+';17';
        }
    }
    if(p.textContent.length===0){
        p.textContent="Non ci sono avvisi sul traffico."
    }
    img.src=imageUrl;
    const mapModal=document.querySelector("#mapModal");
    mapModal.classList.remove("hidden");
    const body=document.querySelector("body");
    body.classList.add("no-scroll");
}

function onSuccessRoad(text,museum,w,h){
    const dataMap=JSON.parse(text);
    const bbox=dataMap.resourceSets[0].resources[0].bbox;
    fetch('http://dev.virtualearth.net/REST/v1/Traffic/Incidents/' + bbox[0] + ',' + bbox[1] + ',' + bbox[2] + ',' + bbox[3] 
        + '/false?severity=1,2,3,4&c=it&type=1,2,3,4,5,6,7,8,9,10,11&key=AjQZQ4PhE6Db3LxZlBgxJV3zVBcYDePgjRj2qFgX1NmIICMyBSf5LBVKRhoB5CfK')
        .then(function(response){
            if(response.ok){
                response.text().then(function(text){
                    const dataTraffic=JSON.parse(text);
                    createMap(museum, dataTraffic,w,h);
                });
            }else{
                onErrorMap(response.statusText); //Questa funzione viene richimata nel caso in cui la chiamata dell'API generi un errore
                return null;
            }            
        },function(error){
            onErrorMap(error); //Questa funzione viene richiamata nel caso in cui la fetch generi un errore, ad esempio se la pagina non esiste
        }
    );
}

function showMap(id){
    const width=window.innerWidth;
    const height=window.innerHeight;
    let w=1024;
    let h=512;
    if(width<height){
        w=width;
        h=parseInt(height*.85);
    }
    for(let museum of contents){
        if(museum.id===parseInt(id)){
            const lat=parseFloat(museum.coordinates.lat);
            const lon=parseFloat(museum.coordinates.lon);
            fetch('https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/' + museum.coordinates.lat + ',' + museum.coordinates.lon 
                + '/15?ml=OrdnanceSurvey&mapSize='+w+','+h+'&format=jpeg&key=AjQZQ4PhE6Db3LxZlBgxJV3zVBcYDePgjRj2qFgX1NmIICMyBSf5LBVKRhoB5CfK&dcl=1&mapMetadata=1')
                .then(function(response){
                    if(response.ok){
                        response.text().then(function(text){
                            onSuccessRoad(text,museum,w,h);
                        });
                    }else{
                        onErrorMap(response.statusText);
                        return null;
                    }
                }
            ,function(error){    
                onErrorMap(error);
            });
            break;
        }
    }
}

function museumMap(event){
    const id=event.currentTarget.parentNode.getAttribute("data-id");
    showMap(id);
}
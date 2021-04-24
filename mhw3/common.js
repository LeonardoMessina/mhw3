function modalInit(){
    for(let modal of document.querySelectorAll(".modal")){
        const exitButtonModal=modal.querySelector(".exitButton");
        if(exitButtonModal){
            exitButtonModal.addEventListener("click",exitModalButton);
        }
        modal.addEventListener("click",exitModal);
        const container=modal.querySelector('.container');
        container.addEventListener("click", stopPropagation);
    }
}

function stopPropagation(event){
    event.stopPropagation();
}

function exitModalButton(event){
    const modal=event.currentTarget.parentNode.parentNode;
    modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    event.stopPropagation();
}

function exitModal(event){
    const modal=event.currentTarget;
    modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    event.stopPropagation();
}
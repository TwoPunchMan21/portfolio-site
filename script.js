const carousel = document.querySelector(".carousel");

let isDragging = false, startX, startScrollLeft;
const dragStart = (e) =>{
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;

}

const dragging = (e) => {
    if(!isDragging) return; //if isDragging is false return from here 
    carousel.scrollLeft = e.pageX;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);


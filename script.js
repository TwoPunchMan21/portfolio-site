const carousel = document.querySelector(".carousel");
const arrowButtons = document.querySelectorAll(".grid-wrapper, .chevron");
const firstElementWidth = carousel.querySelector(".element").offsetWidth;
const carouselChildren = [...carousel.children];


let isDragging = false, startX, startScrollLeft;

//Number of elements that can fit in the carousel at once
let elementPerView = Math.round(carousel.offsetWidth / firstElementWidth);

//Make copies of the last card to the beginning to enable infinite scrolling
carouselChildren.slice(-elementPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

//Make copies of the last card to the beginning to enable infinite scrolling
carouselChildren.slice(0, elementPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend",  card.outerHTML);
});

const dragStart = (e) =>{
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;

}
//adding scroll functions to the left and right buttons
arrowButtons.forEach(button => {
    button.addEventListener("click", () => {
        carousel.scrollLeft += button.id === "left" ? -firstElementWidth : firstElementWidth;
       console.log(button.id);
    });
});


const dragging = (e) => {
    if(!isDragging) return; //if isDragging is false return from here 
    carousel.scrollLeft = e.pageX;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    //if at the beginning, scroll to end
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    //if at end, go to beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");

    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll)


const mainImg = document.getElementById('mainImg');
const thumbnailContainer = document.getElementById('thumbnail-container');

thumbnailContainer.addEventListener('click', (e) => {
    // e.preventDefault();
    if(e.target.tagName === 'IMG') {
        const clickedImg = e.target;

        //Store main image flipped state
        const isFlippedCurrentMain = mainImg.classList.contains('rotation--1');
        console.log(isFlippedCurrentMain);

        //Store current main image state
        const currentMainSrc = mainImg.src;
        const currentMainAlt = mainImg.alt;

        //Set new main image src
        mainImg.src = clickedImg.src;
        mainImg.alt = clickedImg.alt;

        //check if clicked image includes rotation--1;
        const isFlipped = clickedImg.classList.contains('rotation--1');
        console.log(isFlipped);

        if(isFlipped && !isFlippedCurrentMain) {
            mainImg.classList.add('rotation--1');
        }

        if(!isFlipped && isFlippedCurrentMain) {
            mainImg.classList.remove('rotation--1');
        }

        //Set the previous main image as thumbnail in the same place
        clickedImg.src = currentMainSrc;
        clickedImg.alt = currentMainAlt;
        if(isFlippedCurrentMain && !isFlipped) {
            clickedImg.classList.add('rotation--1');
        }

        if(!isFlippedCurrentMain && isFlipped) {
            clickedImg.classList.remove('rotation--1');
        }
    }
});

const changeQuantity = (amount) => {
    const input = document.getElementById('quantity');
    let value = parseInt(input.value, 10) || 0;
    value += amount;
    if (value < parseInt(input.min, 10)) value = parseInt(input.min, 10);
    input.value = value;
}
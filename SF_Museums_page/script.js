const carouselImage = document.querySelector("#carousel-image");
const carouselTitle = document.querySelector("#carousel-title");
const carouselText = document.querySelector("#carousel-description");
const carouselLeftArrow = document.querySelector("#arrow-icon-left");
const carouselRightArrow = document.querySelector("#arrow-icon-right");
const museumCards = document.querySelectorAll(".museum-card");

const letters = document.querySelectorAll(".fade-letter");

let carouselIndex = 0;


let mainArray = [
    ["Exploratorium", "A science and technology museum in San Francisco with interactive exhibits for visitors of all ages. Explore the museum's exhibits and discover something new.", "SFM-Exploratorium.jpg"],
    ["Science Center", "The Science Center in San Francisco offers interactive exhibits and hands-on learning experiences for visitors of all ages, focusing on science and technology.", "SFM-Science-Center.jpg"],
    ["Walt Disney Museum", "The Walt Disney Museum in San Francisco explores the life and legacy of Walt Disney through interactive exhibits and rare artifacts.", "SFM-Walt-Disney-Museum.jpg"],
    ["Cable Car Museum", "San Francisco's Cable Car Museum showcases the history and technology of the city's iconic cable cars. Take a ride or visit the museum to learn more.", "SFM-Cable-Car-Museum.jpg"],
    ["SFMOMA", "SFMOMA is a modern art museum in San Francisco with over 33,000 works from the 20th and 21st centuries. Explore the museum's collection and interactive exhibits.", "SFM-SFMOMA.jpg"],
    ["Asian Art Museum", "San Francisco's Asian Art Museum boasts a diverse collection of Asian art and culture. Explore over 18,000 works from across Asia at this must-see destination.", "SFM-Asian-Art-Museum.jpg"]
];

let descriptionArray = [
    "The Exploratorium is a science museum in San Francisco that features over 800 interactive exhibits and immersive scenes. It is a popular destination for children and adults alike, offering hands-on exhibits and activities that explore a wide range of scientific and artistic.",
    "The Asian Art Museum is a world-renowned institution in San Francisco that displays over 18,000 works of art from across Asia. From ancient ceramics and sculptures to contemporary art and design, the museum explores a diverse range of cultures including China, Japan.",
    "SFMOMA is a modern art museum in San Francisco with over 33,000 works from the 20th and 21st centuries. Explore the museum's collection and interactive exhibits.",
    "The Walt Disney Museum explores the life and legacy of Walt Disney through interactive exhibits and rare artifacts. Explore the museum's collection and interactive exhibits. It is a popular destination for children and adults alike, offering hands-on exhibits.",
    "San Francisco's Cable Car Museum showcases the history and technology of the city's iconic cable cars. Take a ride or visit the museum to learn more and interact. It is a popular destination for children and adults alike, offering hands-on exhibits.",
    "The Science Center in San Francisco offers interactive exhibits and hands-on learning experiences for visitors of all ages, focusing on science and technology. Offering hands-on exhibits and activities that explore a wide range of scientific and artistic."
];

let seeLessArray = [
    "The Exploratorium is home to over 800 exhibits and scenes. . .",
    "The Asian Art Museum is a world-renowned institution in. . .",
    "SFMOMA is a modern art museum in San Francisco with. . .",
    "The Walt Disney Museum explores the life and legacy of. . .",
    "San Francisco's Cable Car Museum showcases the history. . .",
    "The Science Center in San Francisco offers interactive. . ."
]

function handleLetterFade() {
    console.log("running fade function");
    let delay = 0;

    letters.forEach((letter) => {
        letter.style.transition = `opacity 0.5s ease ${delay}s`;
        letter.style.opacity = 1;
        delay += 0.1;
    });
}



function handleSwitchCarousel() {
    console.log("handle")
    if (carouselIndex == mainArray.length - 1) {
        carouselIndex = 0;
    } else {
        carouselIndex++;
    }
    handleCarouselRefresh();
}

function handleLeftArrowClick() {
    console.log("Left Arrow clicked index: " + carouselIndex);
    if (carouselIndex == 0) {
        carouselIndex = mainArray.length - 1;
        console.log("New Index: " + carouselIndex);
    } else {
        carouselIndex -= 1;
        console.log("New Index: " + carouselIndex);
    }
    handleCarouselRefresh();
    resetSlideInterval();
}

function handleRightArrowClick() {
    console.log("Right Arrow Clicked current index: " + carouselIndex);
    if (carouselIndex == mainArray.length - 1) {
        carouselIndex = 0;
    } else {
        carouselIndex++;
    }
    handleCarouselRefresh();
    resetSlideInterval();
}

function handleCarouselRefresh() {
    console.log("Refreshed to index: " + carouselIndex);

    carouselTitle.innerHTML = mainArray[carouselIndex][0];
    carouselText.innerHTML = mainArray[carouselIndex][1];
    carouselImage.src = mainArray[carouselIndex][2];
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(function () {
        handleSwitchCarousel();
    }, 5000);
}

let slideInterval = setInterval(function () {
    handleSwitchCarousel();
}, 5000);

function handleSeeMoreClick(clickedButtonEvent) {
    console.log("See more clicked...running..");
    let clickedButton = clickedButtonEvent.target;
    let buttonId = clickedButton.getAttribute("card-id");
    clickedButton.style.opacity = "0";
    museumCards.forEach((card) => {
        if (card.getAttribute("card-id") == buttonId) {
            card.style.transition = "height 0.5s ease";
            card.style.height = "290px";
            card.querySelector(".card-description").innerHTML = descriptionArray[buttonId];
            card.querySelector(".see-less-button").style.display = "inline";
        }
    })

}

function handleSeeLessClick(clickedButtonEvent) {
    let clickedButton = clickedButtonEvent.target;
    let buttonId = clickedButton.getAttribute("card-id");
    clickedButton.style.display = "none";
    museumCards.forEach((card) => {
        if (card.getAttribute("card-id") == buttonId) {
            card.querySelector(".card-description").innerHTML = seeLessArray[buttonId];
            card.style.height = "250px";
            card.querySelector(".see-more-button").style.opacity = "1";
        }
    })
}

function moveBarOnScroll() {
    console.log("Running move bar");
    document.querySelector("#card-bar-1").style.left = "250px";
    document.querySelector("#card-bar-2").style.left = "40px";
    document.querySelector("#card-section-header-1").style.left = "1200px";
    document.querySelector("#card-section-header-2").style.left = "80px";
    document.querySelector("#fun-fact-card").style.opacity = "1";
}


carouselLeftArrow.addEventListener("click", handleLeftArrowClick);
carouselRightArrow.addEventListener("click", handleRightArrowClick);
document.querySelectorAll(".fade-letter").forEach((letter) => {
    letter.addEventListener("mouseover", handleLetterFade);
})

document.querySelectorAll(".see-more-button").forEach((button) => {
    button.addEventListener("click", handleSeeMoreClick);
})
document.querySelectorAll(".see-less-button").forEach((button) => {
    button.addEventListener("click", handleSeeLessClick);
})

document.querySelector("#snake-box").addEventListener("mouseover", handleLetterFade);

window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
        moveBarOnScroll();
    }
});

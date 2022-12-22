const displayElement = document.querySelector('#main-desc-after');
const buttonElement = document.querySelector('#js-arrow-button');


function handleClick() {
    displayElement.innerHTML = ", self-taught and ambitious, with a strong desire to continuously learn and improve my skills."
    buttonElement.style.visibility = "hidden";
    displayElement.style.opacity = 0;

    let opacity = 0;

    setInterval(function () {
        if (opacity < 1) {
            displayElement.style.opacity = opacity;
            opacity += 0.05;
        }
    }, 80);
}


document.querySelector("#js-arrow-button").addEventListener('click', handleClick);
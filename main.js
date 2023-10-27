import { renderCardUrl } from './src/render-card-url/RenderCardURl';
import { getShortUrl } from './src/use-cases/getShortUrl';
import { isValidUrl } from './src/use-cases/isValidUrl';
import './style.css';



// elementos del menu hamburgesa
const containerHamburger = document.querySelector(".top-header__hamburger");
const linesHamburger = document.querySelectorAll(".top-header__hamburger span");
const containerMenu = document.querySelector(".top-header__menu");
const containerAuth = document.querySelector(".top-header__auth");
const modal = document.querySelector(".top-header__modal");

// elementos para insetar card url short
const btnContent = document.querySelector('.content__btn');
const inputForm = document.querySelector('.content__input');

// arreglo de informacion para las card 
let arrInfoCard = [];

if (JSON.parse(localStorage.getItem('infoCard'))) {
    arrInfoCard = JSON.parse(localStorage.getItem('infoCard'));

    renderCardUrl();
}

// escuchamos al container para aplicar los cambios 
containerHamburger.addEventListener('click', async () => {
    let i = 1;

    linesHamburger.forEach(line => {
        line.classList.toggle(`top-header__line${i}`);
        i++;
    });

    modal.classList.toggle("top-header__modal--displayed");
    containerMenu.classList.toggle("top-header__menu--displayed");
    containerAuth.classList.toggle("top-header__auth--displayed");
});

// escuchamos al envio del formulario para insertarlo en el html
btnContent.addEventListener('click', async (event) => {
    event.preventDefault();

    const urlString = inputForm.value;
    const shortURL = await getShortUrl(urlString);

    if (!isValidUrl(urlString)) {
        return;
    }
    if (!arrInfoCard) {
        return;
    }
    arrInfoCard.push({ urlString, shortURL });

    localStorage.setItem('infoCard', JSON.stringify(arrInfoCard));
    renderCardUrl();
});




import './renderCardUrl.css';



const   COPY = 'Copy',
        COPIED = 'Copied';


export const renderCardUrl = () => {

    const divContainer = document.querySelector('#containerCardUrl');
    let arrCards = JSON.parse(localStorage.getItem('infoCard'));

    if (!arrCards) {
        return;
    }
    //limpia el html
    divContainer.innerHTML = '';

    arrCards.map(({ urlString, shortURL }) => {
        const card = document.createElement('article');

        card.innerHTML = `
        <article class="card">
            <h5 class="card__url">${urlString}</h5>
            <div class="card__hr"></div>
            <div class="card__wrapper-copy">
                <span class="card__short-url">${shortURL}</span>
                <button class="card__btn-copy">Copied</button>
            </div>
        </article> `

        divContainer.append(card);
    });

    const arrBtnCopy = document.querySelectorAll('.card__btn-copy');

    arrBtnCopy.forEach(btnCopy => {
        btnCopy.addEventListener('click', (event) => {
            event.preventDefault();
            const wrapperCopy = btnCopy.parentNode;
            const shortUrl = wrapperCopy.querySelector('.card__short-url').textContent;
            
            copyUrl(shortUrl);
            btnCopy.innerText = COPY;
            btnCopy.classList.add('card__btn-copy--active');
            btnCopy.disabled = true;

            //pasado el tiempo se le quita la clase y se regresa el texto
            setTimeout(() => {
                btnCopy.innerText = COPIED;
                btnCopy.classList.remove('card__btn-copy--active');
                btnCopy.disabled = false;
            }, 800);
        });
    });

    
    /**
     * copia el  shortUrl al portapapeles 
     * @param {String} shortUrl 
     */
    const copyUrl = (shortUrl) => {

        try {
            navigator.clipboard.writeText(shortUrl);

        } catch (error) {
            throw new Error(error);
        }
    }
}
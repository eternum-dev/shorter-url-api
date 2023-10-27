
const inp = document.querySelector('.content__input');
const lbl = document.querySelector('.content__label');


/**
 * 
 * @param {String} urlString 
 * @returns 
 */
export const isValidUrl = (urlString) => {

    // url no puede estar vacia
    if (!urlString) {
        addClassError('Debe ingresar una url'); 
        inp.addEventListener('input', () => {
            removeClassError();
        });
        return;
    }

    // url debe tener el formato necesario
    try {
        return Boolean(new URL(urlString));
    }
    catch (error) {
        addClassError('url no valid');
        inp.addEventListener('input', () => {
            removeClassError();
        })
        return false;
    }
}

const addClassError = (error) => {
    lbl.innerHTML = '';
    lbl.append(inp, error);
    inp.classList.add('content__input--error');
}

const removeClassError = () => {
    lbl.innerHTML = '';
    lbl.append(inp);
    inp.classList.remove('content__input--error');
}

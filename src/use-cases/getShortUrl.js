/**
 * 
 * @param {String} urlString 
 * @returns 
 */

export const getShortUrl = async (urlString) => {
    // variables de entorno
    const API_KEY = import.meta.env.VITE_API_KEY;
    const DOMINIO = import.meta.env.VITE_DOMINIO;

    // CONFIGURACION DE LA API 
    let data = {
        "domain": DOMINIO,
        "originalURL": urlString
    };
    // peticion fetch
    await fetch('https://api.short.io/links/public', {
        method: 'post',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization':  API_KEY,
        },
        body: JSON.stringify(data)
    }).then(async function (response) {
        data = await response.json();
    })

    return data.shortURL;
}

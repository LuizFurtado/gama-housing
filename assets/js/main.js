const destaqueCard = document.querySelector("#destaque");
const imoveisLista = document.querySelector("#lista-imoveis");
const imoveis = [];

const renderDestaque = imovel => {
    let price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(imovel.price);

    const html = `
        <div class="destaque-img">
            <img src="${imovel.photo}" alt="${imovel.name}">
        </div>
        <div class="destaque-detalhes">
            <h2>${imovel.name}</h2>
            <p><strong>Tipo:</strong> ${imovel.property_type}</p>
            <p><strong>Diária:</strong> ${price}</p>
            <button>Saiba mais</button>
        </div>
    `;

    return html;
}

const renderImovelCard = imoveis => {
    let price = '';
    let html = '';

    for(imovel of imoveis) {
        price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(imovel.price);

        html = `
            <div class="imovel-card">
                <img src="${imovel.photo}" alt="${imovel.name}">
                <h3>${imovel.name}</h3>
                <p><strong>Tipo:</strong> ${imovel.property_type}</p>
                <p><strong>Diária:</strong> ${price}</p>
                <button>Saiba mais</button>
            </div>
        `;

        imoveisLista.insertAdjacentHTML("beforeend", html);
    };
}

axios.get("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72")
    .then(response => {
        for(imovel of response.data) {
            imoveis.push(imovel);
        }
        //console.log(imoveis);
        const indexDestaque = Math.floor(Math.random() * (imoveis.length - 1))
        destaqueCard.insertAdjacentHTML('beforeend', renderDestaque(imoveis[indexDestaque]));
        renderImovelCard(imoveis);
    })
    .catch(error => {
        console.log(error);
    })
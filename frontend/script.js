const searchInput = document.querySelector('.search-bar');
const musicContainer = document.querySelector('.table');
const filtroArtistasBtn = document.querySelector('.filtro-artistas-btn');
const filtroIdiomasBtn = document.querySelector('.filtro-idiomas-btn');
const containerDinamico = document.querySelector('.filtros-dinamicos');

// Função para renderizar as músicas na interface
function renderMusicas(musicas) {
    musicContainer.innerHTML = '';

    musicas.forEach(musica => {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        cell.innerHTML = `
            <div class="codigo">
                <p>${musica.codigo}</p>
            </div>
            <div class="titulo-cantor">
                <p>${musica.titulo}</p>
                <p>${musica.interprete}</p>
            </div>
            <div class="idioma">
                <p>${musica.idioma}</p>
            </div>
        `;
        musicContainer.appendChild(cell);
    });
}

// Função para buscar músicas da API com filtros
async function buscarMusicas(filtros = {}) {
    let url = 'http://localhost:3000/musicas';
    const params = new URLSearchParams();

    if (filtros.termo) params.append('termo', filtros.termo);
    if (filtros.artista) params.append('artista', filtros.artista);
    if (filtros.idioma) params.append('idioma', filtros.idioma);
    if (filtros.titulo) params.append('titulo', filtros.titulo);

    if ([...params].length) url += `?${params.toString()}`;

    console.log('Buscando músicas com URL:', url); // Para ver se está gerando corretamente

    try {
        const res = await fetch(url);
        const musicas = await res.json();
        renderMusicas(musicas);
    } catch (err) {
        console.error('Erro ao buscar músicas:', err);
    }
}

// Buscar conforme o usuário digita
searchInput.addEventListener('input', async () => {
    const termo = searchInput.value.trim();
    buscarMusicas({ termo });
});

// Renderização de artistas para torná-los clicáveis
function renderArtistas(artistas) {
    musicContainer.innerHTML = ''; // Limpa as músicas que estavam na tela

    artistas.forEach(nome => {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'artista-cell'); // Adiciona classe para estilização

        cell.innerHTML = `
            <div class="artista">
                <p>${nome}</p>
            </div>
        `;

        // Torna os artistas clicáveis para buscar as músicas correspondentes
        cell.addEventListener('click', () => buscarMusicas({ artista: nome.trim() }));

        musicContainer.appendChild(cell);
    });
}

// Evento de clique no botão de artistas
filtroArtistasBtn.addEventListener('click', async () => {
    try {
        const res = await fetch('http://localhost:3000/musicas/artistas');
        const artistas = await res.json();

        renderArtistas(artistas); // Exibe os artistas e torna-os interativos

    } catch (err) {
        console.error('Erro ao carregar artistas:', err);
    }
});

// Função de renderização para exibir os idiomas ao invés das músicas
function renderIdiomas(idiomas) {
    musicContainer.innerHTML = ''; // Limpa as músicas que estavam na tela

    idiomas.forEach(lang => {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'idioma-cell');

        cell.innerHTML = `
            <div class="idiomas">
                <p>${lang}</p>
            </div>
        `;

        cell.addEventListener('click', () => buscarMusicas({ idioma: encodeURIComponent(lang) }));

        musicContainer.appendChild(cell);
    });
}

// Listar idiomas ao clicar no botão
filtroIdiomasBtn.addEventListener('click', async () => {
    try {
        const res = await fetch('http://localhost:3000/musicas/idiomas');
        const idiomas = await res.json();

        renderIdiomas(idiomas); // Exibe os idiomas e torna interativos

    } catch (err) {
        console.error('Erro ao carregar idiomas:', err);
    }
});

// Buscar todas as músicas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    buscarMusicas();
});

(function () {
  'use strict';

  const LUGARES = [
    { id: "konoha", titulo: "Konohagakure", desc: "La aldea oculta de la hoja, hogar de los ninjas principales y los Hokages. Mítico por ser el centro de la historia de Naruto." },
    { id: "valle-del-fin", titulo: "Valley of the End", desc: "Donde se enfrentaron Hashirama y Madara, y después Naruto y Sasuke. Mítico por las estatuas de los fundadores medio destruidas." },
    { id: "monte-myoboku", titulo: "Mount Myōboku", desc: "Montaña sagrada donde viven los toads y donde Jiraiya y Naruto entrenaron. Mítico por la geografía única y los entrenamientos de senjutsu." },
    { id: "bosque-de-la-muerte", titulo: "Forty-Fourth Training Ground", desc: "Conocido como Bosque de la Muerte, escenario del examen chūnin de la Tercera Gran Guerra Ninja. Mítico por su alta tasa de mortalidad." },
    { id: "kirigakure", titulo: "Kirigakure", desc: "Aldea oculta de la niebla, famosa por los exámenes chūnin crueles y la tradición de los espadachines de kagura." },
    { id: "sunagakure", titulo: "Sunagakure", desc: "Aldea oculta de la arena, destino de los exámenes chūnin y hogar de la familia Kazekage. Mítico por su clima desértico y las técnicas de arena." },
    { id: "sede-akatsuki", titulo: "Amegakure", desc: "Villa de la lluvia, sede secreta de la Akatsuki. Mítico por su entorno lluvioso y los conflictos políticos." },
    { id: "ciudad-de-la-luna", titulo: "Tsukuyomi", desc: "Lugar asociado con la luna y el ojo Sharingan de elite. Mítico por su conexión con los genjutsu de alto nivel." },
    { id: "aldea-del-sonido", titulo: "Otogakure", desc: "Aldea del sonido, base de operaciones de Orochimaru. Mítico por sus experimentos humanos y laboratorios ocultos." },
    { id: "templo-uzumaki", titulo: "Uzumaki Clan's Mask Storage Temple", desc: "Templo del clan Uzumaki, guardianes del sello de Kurama. Mítico por su arquitectura circular y sellos poderosos." },
    { id: "bosque-del-clan-nara", titulo: "Nara Clan Forest", desc: "Bosque del clan Nara, conocidos por técnicas de sombra y el juego de shōgi ninja. Mítico por entrenamientos de noche." },
    { id: "tierra-de-fuego", titulo: "Land of Fire", desc: "País natal de Konoha, conocido por su clima suave y ser el escenario de muchas batallas. Mítico por ser el hogar de los shinobi principales." },
    { id: "tierra-de-las-olas", titulo: "Land of Waves", desc: "País costero donde Naruto y Team 7 completaron su primera misión oficial. Mítico por el puente Great Wave." },
    { id: "kusagakure", titulo: "Kusagakure", desc: "Aldea de la hierba, aliada ocasional y hogar de varios jonin. Mítico por su densa vegetación y técnicas de madera." },
    { id: "torneo-chunin", titulo: "Chūnin Exams", desc: "El examen chūnin es el rito de paso para convertirse en chūnin. Mítico por los torneos mortales y los desafíos interclan." },
    { id: "tierra-de-la-nieve", titulo: "Land of Snow", desc: "País frío aliado de la nube, escenario de misiones de invierno. Mítico por sus técnicas de hielo y entorno gélido." }
  ];

  const BATALLAS = [
    { id: "madara-hashirama", titulo: "Madara Uchiha vs Hashirama Senju", url: "https://www.youtube.com/watch?v=J3Th1jKjRgk", vistas: "3.2M", largo: "3:08", canal: "Naruto Shippuden" },
    { id: "itachi-sasuke", titulo: "Itachi Uchiha vs Sasuke Uchiha", url: "https://www.youtube.com/watch?v=e1MEera8C8w", vistas: "8.1M", largo: "12:46", canal: "Naruto Shippuden" },
    { id: "jiraiya-pain", titulo: "Jiraiya vs Pain", url: "https://www.youtube.com/watch?v=raYD5O0xpZQ", vistas: "15.6M", largo: "20:55", canal: "Naruto Shippuden" },
    { id: "guy-madara", titulo: "Might Guy vs Madara Uchiha (8 Gates)", url: "https://www.youtube.com/watch?v=LMyk4Ny8Dvk", vistas: "2.4M", largo: "9:44", canal: "Naruto Shippuden" },
    { id: "sasuke-danzo", titulo: "Sasuke vs Danzo", url: "https://www.youtube.com/watch?v=kM4HgzJYAag", vistas: "1.1M", largo: "32:08", canal: "Naruto Shippuden" },
    { id: "gaara-sasuke", titulo: "Gaara vs Sasuke", url: "https://www.youtube.com/watch?v=28LqbhlgJCg", vistas: "3.8M", largo: "7:29", canal: "Naruto Shippuden" },
    { id: "kabuto-itachi", titulo: "Kabuto Yakushi vs Itachi Uchiha", url: "https://www.youtube.com/watch?v=XqxXNexDjyI", vistas: "652K", largo: "28:55", canal: "Naruto Ultimate Ninja Storm" },
    { id: "naruto-obito", titulo: "Naruto vs Obito Uchiha", url: "https://www.youtube.com/watch?v=Zz3I18ppx1g", vistas: "1.3M", largo: "12:28", canal: "Naruto Shippuden" },
    { id: "minato-tobi", titulo: "Minato Namikaze vs Obito", url: "https://www.youtube.com/watch?v=Llr2dcd-VBo", vistas: "942K", largo: "3:04", canal: "Naruto Shippuden" },
    { id: "hinata-pain", titulo: "Hinata vs Pain", url: "https://www.youtube.com/watch?v=PmNa8SWGm4A", vistas: "2.2M", largo: "10:26", canal: "Naruto Shippuden" },
    { id: "zabuza-kakashi", titulo: "Zabuza vs Kakashi", url: "https://www.youtube.com/watch?v=uKtLZzEtoNw", vistas: "1.5M", largo: "4:00", canal: "Naruto" },
    { id: "sasuke-deidara", titulo: "Sasuke vs Deidara", url: "https://www.youtube.com/watch?v=WPz4m91IF2U", vistas: "4.7M", largo: "21:20", canal: "Naruto Shippuden" },
    { id: "kakashi-obito", titulo: "Kakashi vs Obito", url: "https://www.youtube.com/watch?v=TmGD7P3uI4M", vistas: "892K", largo: "9:02", canal: "Naruto Shippuden" },
    { id: "lee-guy", titulo: "Rock Lee vs Might Guy (Épico)", url: "https://www.youtube.com/watch?v=T7l-DJ9hZYE", vistas: "1.1M", largo: "2:39", canal: "Naruto Shippuden" },
    { id: "madara-hashirama2", titulo: "Madara vs Hashirama (Full Fight English)", url: "https://www.youtube.com/results?search_query=Madara+vs+Hashirama+full+fight+english", vistas: "N/A", largo: "N/A", canal: "Búsqueda YouTube" }
  ];

  const gridPersonajes = document.getElementById('grid-personajes');
  const filtros = document.querySelectorAll('.filtro');
  const gridLugares = document.getElementById('grid-lugares');
  const gridBatallas = document.getElementById('grid-batallas');

  const personajes = window.PERSONAJES || [];

  const ETIQUETAS_EQUIPO = {
    equipo7: 'Equipo 7',
    equipo8: 'Equipo 8',
    equipo3: 'Equipo 3',
    'equipo-guy': 'Equipo Guy',
    anbu: 'ANBU',
    akatsuki: 'Akatsuki',
    hokage: 'Hokage',
    sensei: 'Sensei',
    konoha: 'Konoha',
    arena: 'Arena',
    legendarios: 'Equipo Legendario'
  };

  function renderizarPersonajes(filtro = 'todos') {
    if (!gridPersonajes) return;
    gridPersonajes.innerHTML = '';
    const filtrados = filtro === 'todos'
      ? personajes
      : personajes.filter(p => p.equipos.indexOf(filtro) !== -1);

    filtrados.forEach(p => {
      const etiquetas = p.equipos
        .map(eq => ETIQUETAS_EQUIPO[eq] || eq)
        .join(' · ');

      const card = document.createElement('div');
      card.className = 'card-personaje';
      card.dataset.equipo = p.equipos.join(' ');
      card.innerHTML = `
        <img src="img/personajes/${p.img}" alt="${p.nombre}" onerror="this.outerHTML='<div class=\'img-faltante\'>Sin imagen</div>'">
        <div class="info">
          <h3>${p.nombre}</h3>
          <span class="equipo">${etiquetas}</span>
          <span class="rol">${p.rol}</span>
        </div>
      `;
      gridPersonajes.appendChild(card);
    });

    filtros.forEach(btn => btn.classList.toggle('activo', btn.dataset.filtro === filtro));
  }

  function renderizarLugares() {
    if (!gridLugares) return;
    gridLugares.innerHTML = '';
    LUGARES.forEach(lugar => {
      const card = document.createElement('div');
      card.className = 'card-lugar';
      card.innerHTML = `
        <img src="img/lugares/${lugar.id}.jpg" alt="${lugar.titulo}">
        <div class="info">
          <h3>${lugar.titulo}</h3>
          <p>${lugar.desc}</p>
        </div>
      `;
      gridLugares.appendChild(card);
    });
  }

  function renderizarBatallas() {
    if (!gridBatallas) return;
    gridBatallas.innerHTML = '';
    BATALLAS.forEach(batalla => {
      const card = document.createElement('div');
      card.className = 'card-batalla';
      card.innerHTML = `
        <div class="thumbnail">
          <iframe src="https://www.youtube.com/embed/${batalla.url.split('v=')[1]}" title="${batalla.titulo}" allowfullscreen loading="lazy"></iframe>
        </div>
        <div class="info">
          <h3>${batalla.titulo}</h3>
          <div class="canal">${batalla.canal}</div>
          <div class="duracion">${batalla.largo} • ${batalla.vistas}</div>
        </div>
      `;
      gridBatallas.appendChild(card);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderizarPersonajes();
    renderizarLugares();
    renderizarBatallas();

    filtros.forEach(btn => {
      btn.addEventListener('click', () => {
        const filtro = btn.dataset.filtro;
        renderizarPersonajes(filtro);
        filtros.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
      });
    });
  });
})();

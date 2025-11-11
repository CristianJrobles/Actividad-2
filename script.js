const resources = [
    {
        name: "Energía Solar",
        emoji: "☀️",
        category: "renovable",
        description: "Luz y calor del sol",
        info: "La energía solar es inagotable. El sol brillará durante miles de millones de años, proporcionando energía limpia y gratuita.",
        detail: "Es renovable porque el sol produce energía constantemente mediante fusión nuclear. Podemos usar paneles solares para convertir esta energía en electricidad sin agotarla."
    },
    {
        name: "Energía Eólica",
        emoji: "💨",
        category: "renovable",
        description: "Energía del viento",
        info: "El viento se genera por diferencias de temperatura en la atmósfera, un proceso natural continuo.",
        detail: "Es renovable porque el viento es producto del calentamiento desigual del planeta por el sol. Los aerogeneradores aprovechan esta energía sin agotarla."
    },
    {
        name: "Energía Hidráulica",
        emoji: "💧",
        category: "renovable",
        description: "Energía del agua en movimiento",
        info: "El ciclo del agua es constante: evaporación, lluvia y flujo de ríos se repiten eternamente.",
        detail: "Es renovable gracias al ciclo del agua. El sol evapora el agua, forma nubes, llueve y los ríos fluyen hacia el mar, repitiéndose continuamente."
    },
    {
        name: "Energía Geotérmica",
        emoji: "🌋",
        category: "renovable",
        description: "Calor del interior de la Tierra",
        info: "El núcleo de la Tierra mantiene temperaturas altísimas y se regenera mediante procesos geológicos.",
        detail: "Es renovable porque el calor interno de la Tierra proviene de la descomposición de elementos radiactivos y se mantiene durante millones de años."
    },
    {
        name: "Biomasa Vegetal",
        emoji: "🌿",
        category: "renovable",
        description: "Materia orgánica de plantas",
        info: "Las plantas crecen mediante fotosíntesis, un proceso que puede repetirse constantemente si se gestionan bien.",
        detail: "Es renovable porque las plantas crecen cada temporada. Si plantamos nuevos árboles al cortar otros, el recurso se mantiene disponible."
    },
    {
        name: "Petróleo",
        emoji: "🛢️",
        category: "no renovable",
        description: "Combustible fósil líquido",
        info: "Se formó durante millones de años a partir de restos de organismos marinos bajo presión y calor extremos.",
        detail: "Es no renovable porque tarda millones de años en formarse. Una vez que extraemos y usamos el petróleo de un yacimiento, no se regenera en nuestra vida ni en miles de generaciones."
    },
    {
        name: "Gas Natural",
        emoji: "🔥",
        category: "no renovable",
        description: "Combustible fósil gaseoso",
        info: "Se origina de materia orgánica antigua que quedó atrapada bajo tierra hace millones de años.",
        detail: "Es no renovable porque su formación requirió procesos geológicos de millones de años. Lo consumimos mucho más rápido de lo que la naturaleza puede producirlo."
    },
    {
        name: "Carbón",
        emoji: "⚫",
        category: "no renovable",
        description: "Roca sedimentaria combustible",
        info: "Se formó de antiguos bosques que quedaron enterrados y comprimidos durante millones de años.",
        detail: "Es no renovable porque proviene de plantas que vivieron hace 300 millones de años. Las condiciones especiales para su formación ya no existen en la Tierra."
    },
    {
        name: "Hierro",
        emoji: "🔩",
        category: "no renovable",
        description: "Metal usado en construcción",
        info: "Es un mineral metálico que existe en cantidades limitadas en la corteza terrestre.",
        detail: "Es no renovable porque los yacimientos de hierro se formaron hace millones de años por procesos geológicos. Una vez extraído, no se regenera naturalmente."
    },
    {
        name: "Cobre",
        emoji: "🟤",
        category: "no renovable",
        description: "Metal conductor usado en cables",
        info: "Mineral metálico extraído de minas que tomó millones de años en concentrarse en yacimientos.",
        detail: "Es no renovable porque existe en cantidad fija en el planeta. Aunque se puede reciclar, los yacimientos naturales no se reponen una vez extraídos."
    },
    {
        name: "Oro",
        emoji: "🏆",
        category: "no renovable",
        description: "Metal precioso",
        info: "Metal raro formado en el interior de estrellas hace miles de millones de años y llegó a la Tierra por meteoritos.",
        detail: "Es no renovable porque todo el oro en la Tierra llegó de explosiones de estrellas. No se crea más oro naturalmente en nuestro planeta."
    },
    {
        name: "Uranio",
        emoji: "☢️",
        category: "no renovable",
        description: "Mineral radiactivo para energía nuclear",
        info: "Elemento radiactivo usado en centrales nucleares que existe en cantidades limitadas.",
        detail: "Es no renovable porque es un elemento que se formó hace miles de millones de años. Una vez usado en reactores nucleares, se agota y no se regenera."
    }
];

let currentResourceIndex = 0;
let score = { correct: 0, incorrect: 0, points: 0 };
let shuffledResources = [];

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function startGame() {
    shuffledResources = shuffleArray(resources);
    currentResourceIndex = 0;
    score = { correct: 0, incorrect: 0, points: 0 };
    updateScore();
    updateProgress();
    showNextResource();
}

function showNextResource() {
    if (currentResourceIndex >= shuffledResources.length) {
        endGame();
        return;
    }

    const resource = shuffledResources[currentResourceIndex];
    document.getElementById('resource-emoji').textContent = resource.emoji;
    document.getElementById('resource-name').textContent = resource.name;
    document.getElementById('resource-description').textContent = resource.description;
    updateProgress();
}

function updateProgress() {
    const progress = (currentResourceIndex / shuffledResources.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function checkAnswer(selectedCategory) {
    const currentResource = shuffledResources[currentResourceIndex];
    const modal = document.getElementById('feedback-modal');
    const title = document.getElementById('feedback-title');
    const info = document.getElementById('feedback-info');
    const detail = document.getElementById('feedback-detail');
    
    if (selectedCategory === currentResource.category) {
        score.correct++;
        score.points += 10;
        title.textContent = '¡Correcto! 🎉';
        title.className = 'feedback-title correct';
        info.textContent = currentResource.info;
    } else {
        score.incorrect++;
        const correctCategory = currentResource.category === 'renovable' ? 'RENOVABLE' : 'NO RENOVABLE';
        title.textContent = '¡Incorrecto! 😔';
        title.className = 'feedback-title incorrect';
        info.innerHTML = `<strong>Respuesta correcta: ${correctCategory}</strong><br><br>${currentResource.info}`;
    }
    
    detail.textContent = currentResource.detail;
    
    updateScore();
    modal.classList.add('show');
    
    setTimeout(() => {
        modal.classList.remove('show');
        setTimeout(() => {
            currentResourceIndex++;
            showNextResource();
        }, 300);
    }, 4500);
}

function updateScore() {
    document.getElementById('correct').textContent = score.correct;
    document.getElementById('incorrect').textContent = score.incorrect;
    document.getElementById('points').textContent = score.points;
}

function endGame() {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('final-correct').textContent = score.correct;
    document.getElementById('final-incorrect').textContent = score.incorrect;
    document.getElementById('final-points').textContent = score.points;
}

function restartGame() {
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('game-over').style.display = 'none';
    startGame();
}

startGame();
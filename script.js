// Seleciona elementos do HTML
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const resetGame = document.getElementById('resetGame');
const feedback = document.getElementById('feedback');
const remainingAttempts = document.getElementById('remainingAttempts');
const guessHistory = document.getElementById('guessHistory');
const guessRange = document.getElementById('guessRange');
const rangeInfo = document.getElementById('rangeInfo');
const difficultySelect = document.getElementById('difficulty');
const scoreDisplay = document.getElementById('score');
const scoreValue = document.getElementById('scoreValue');
const themeToggle = document.getElementById('themeToggle');
const minRangeInput = document.getElementById('minRange');
const maxRangeInput = document.getElementById('maxRange');
const startGameButton = document.getElementById('startGame');

// Variáveis do jogo
let randomNumber;
let attempts;
let maxAttempts;
let minRange;
let maxRange;
let score = 0;

// Inicializa o jogo
function initializeGame() {
    setDifficulty();
    randomNumber = generateRandomNumber(minRange, maxRange);
    attempts = maxAttempts;
    feedback.textContent = '';
    remainingAttempts.textContent = attempts;
    guessHistory.innerHTML = '';
    scoreValue.textContent = score;
    guessRange.style.display = 'none';
    scoreDisplay.style.display = 'none';
    guessInput.value = '';
    guessInput.disabled = false;
    submitGuess.style.display = 'inline';
    resetGame.style.display = 'none';
}

// Gera um número aleatório entre o intervalo definido
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Configura a dificuldade e o intervalo personalizado
function setDifficulty() {
    const difficulty = difficultySelect.value;
    if (difficulty === 'easy') {
        maxAttempts = 15;
    } else if (difficulty === 'medium') {
        maxAttempts = 10;
    } else if (difficulty === 'hard') {
        maxAttempts = 5;
    }

    // Define o intervalo com base na entrada do usuário ou nos valores padrão
    minRange = parseInt(minRangeInput.value) || 1;
    maxRange = parseInt(maxRangeInput.value) || 100;

    // Verifica se o intervalo é válido
    if (minRange >= maxRange) {
        alert("Intervalo inválido! Certifique-se de que o mínimo seja menor que o máximo.");
        minRange = 1;
        maxRange = 100;
    }
    rangeInfo.textContent = `${minRange} - ${maxRange}`;
}

// Alterna entre modo claro e escuro
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? 'Modo Escuro' : 'Modo Claro';
});

// Verifica o palpite do jogador
function checkGuess() {
    const userGuess = parseInt(guessInput.value);
    if (isNaN(userGuess) || userGuess < minRange || userGuess > maxRange) {
        feedback.textContent = `Por favor, insira um número entre ${minRange} e ${maxRange}.`;
        feedback.style.color = 'orange';
        feedback.classList.add('show');
        return;
    }

    attempts--;
    remainingAttempts.textContent = attempts;
    feedback.classList.add('show');
    remainingAttempts.classList.add('show');

    if (!isNaN(userGuess)) {
        guessHistory.innerHTML += `<span>${userGuess}</span> `;
    }

    if (userGuess === randomNumber) {
        feedback.textContent = 'Parabéns! Você acertou o número!';
        feedback.style.color = 'green';
        updateScore();
        endGame();
    } else if (attempts === 0) {
        feedback.textContent = `Fim de jogo! O número era ${randomNumber}.`;
        feedback.style.color = 'red';
        endGame();
    } else if (userGuess < randomNumber) {
        feedback.textContent = 'Tente um número maior.';
        feedback.style.color = 'blue';
        updateRange(userGuess, 'min');
    } else {
        feedback.textContent = 'Tente um número menor.';
        feedback.style.color = 'blue';
        updateRange(userGuess, 'max');
    }

    guessInput.value = '';
}

// Atualiza a faixa de palpites com base nas dicas
function updateRange(guess, type) {
    if (type === 'min') {
        minRange = guess + 1;
    } else if (type === 'max') {
        maxRange = guess - 1;
    }
    rangeInfo.textContent = `${minRange} - ${maxRange}`;
    guessRange.style.display = 'block';
}

// Atualiza a pontuação
function updateScore() {
    score += attempts * 10;
    scoreValue.textContent = score;
    scoreDisplay.style.display = 'block';
}

// Função para encerrar o jogo
function endGame() {
    guessInput.disabled = true;
    submitGuess.style.display = 'none';
    resetGame.style.display = 'inline';
}

// Função para reiniciar o jogo
function reset() {
    score = 0;
    initializeGame();
}

// Inicia o jogo com o intervalo personalizado
startGameButton.addEventListener('click', initializeGame);

// Eventos
submitGuess.addEventListener('click', checkGuess);
resetGame.addEventListener('click', reset);
guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Atualiza o jogo ao mudar a dificuldade
difficultySelect.addEventListener('change', initializeGame);

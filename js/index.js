class Memory {
    constructor() {
        this.cardColors = ['apple', 'apple', 'banana', 'banana', 'cherry', 'cherry', 'grapefruit', 'grapefruit', 'grapes', 'grapes', 'kiwi', 'kiwi', 'pear', 'pear', 'strawberry', 'strawberry', 'watermelon', 'watermelon'];

        this.gamePairs = this.cardColors.length / 2;
        this.gameResult = 0;
        this.clickCards = [];

        this.startButtons = null;
        this.cards = null;

        this.movesSpan = null;
        this.moves = 0;
        this.timeSpan = null;
        this.time = 0;
        this.startWin = null;
        this.endWin = null;
        this.runTimer = null;
        this.timeResultSpan = null;
        this.movesResultSpan = null;
        this.finishGame = null;

        this.UiSelectors = {
            time: '[data-time]',
            moves: '[data-moves]',
            cards: '[data-card]',
            startBtn: '[data-start]',
            startWin: '[data-startWindow]',
            endWin: '[data-endWindow]',
            timeResultSpan: '[data-timeResult]',
            movesResultSpan: '[data-movesResult]',
        }
    }

    initializeGame() {
        this.movesSpan = document.querySelector(this.UiSelectors.moves);
        this.movesSpan.textContent = this.moves;
        this.timeSpan = document.querySelector(this.UiSelectors.time);
        this.timeSpan.textContent = this.time;
        this.cards = [...document.querySelectorAll(this.UiSelectors.cards)];
        this.startWin = document.querySelector(this.UiSelectors.startWin);
        this.endWin = document.querySelector(this.UiSelectors.endWin);
        this.startButtons = [...document.querySelectorAll(this.UiSelectors.startBtn)];
        this.timeResultSpan = document.querySelector(this.UiSelectors.timeResultSpan);
        this.movesResultSpan = document.querySelector(this.UiSelectors.movesResultSpan);
        this.addEventListeners();
    }

    addEventListeners() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => this.openCard(card))
        });
        this.startButtons.forEach(button => button.addEventListener('click', () => {
            this.startGame()
        }));
    }

    startGame() {
        this.startWin.classList.add('window-wrap--hidden');
        if (this.finishGame) this.reset();
        this.movesSpan.textContent = this.moves;
        this.cards.forEach(card => {
            const index = Math.floor(Math.random() * this.cardColors.length);
            card.classList.add(`card--${this.cardColors[index]}`);
            this.cardColors.splice(index, 1);
        })
        setTimeout(() => {
            this.cards.forEach(card => {
                card.classList.add('card--hidden');
            })
        }, 2000);

        this.runTimer = setInterval(() => {
            this.time++;
            this.timeSpan.textContent = `${(this.time / 100).toFixed(2)}s`;
        }, 10);
    }

    reset() {
        this.endWin.classList.add('window-wrap--hidden');
        this.cardColors = ['apple', 'apple', 'banana', 'banana', 'cherry', 'cherry', 'grapefruit', 'grapefruit', 'grapes', 'grapes', 'kiwi', 'kiwi', 'pear', 'pear', 'strawberry', 'strawberry', 'watermelon', 'watermelon'];
        this.cards.forEach(card => card.className = 'card');
        this.gameResult = 0;
        this.moves = 0;
        this.time = 0;
    }

    openCard(card) {
        if (card.classList.contains('card--off')) return;
        if (card == this.clickCards[0]) return;
        if (this.clickCards.length < 2) {
            this.clickCards.push(card);
            card.classList.remove('card--hidden');
        }
        if (this.clickCards.length == 2) {
            this.moves++;
            this.movesSpan.textContent = this.moves;
            this.cards.forEach(card => card.removeEventListener('click', this.addEventListeners));
            setTimeout(() => {
                if (this.clickCards[0].className == this.clickCards[1].className) {
                    this.clickCards.forEach(card => card.classList.add('card--off'));
                    this.clickCards.length = 0;
                    this.gameResult++;

                    if (this.gameResult === this.gamePairs) {
                        clearInterval(this.runTimer);
                        this.finishGame = true;
                        this.endWin.classList.remove('window-wrap--hidden');
                        this.timeResultSpan.textContent = `Your time: ${(this.time / 100).toFixed(2)}s`;
                        this.movesResultSpan.textContent = `Numbers of moves: ${this.moves}`;
                    }
                } else {
                    this.clickCards.forEach(card => card.classList.add('card--hidden'));
                    this.clickCards.length = 0;
                }
            }, 1000);
        }
    }
}
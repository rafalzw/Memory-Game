class Memory {
    constructor() {
        this.cardColors = ['apple', 'apple', 'banana', 'banana', 'cherry', 'cherry', 'grapefruit', 'grapefruit', 'grapes', 'grapes', 'kiwi', 'kiwi', 'pear', 'pear', 'strawberry', 'strawberry', 'watermelon', 'watermelon'];

        this.startButton = null;

        this.startTime = new Date().getTime();
        this.endTime = null;
        this.gameTime = null;
        this.gamePairs = this.cardColors.length / 2;
        this.gameResult = 0;

        this.cards = null;
        this.clickCards = [];
        this.movesSpan = null;
        this.moves = 0;
        this.timeSpan = null;
        this.time = 0;
        this.startWrap = null;
        this.runTimer;

        this.UiSelectors = {
            time: '[data-time]',
            moves: '[data-moves]',
            cards: '[data-card]',
            start: '[data-start]',
            startWrap: '.start-wrap',
        }
    }

    initializeGame() {
        this.movesSpan = document.querySelector(this.UiSelectors.moves);
        this.movesSpan.textContent = this.moves;
        this.timeSpan = document.querySelector(this.UiSelectors.time);
        this.timeSpan.textContent = this.time;
        this.cards = [...document.querySelectorAll(this.UiSelectors.cards)];
        this.startWrap = document.querySelector(this.UiSelectors.startWrap);
        this.startButton = document.querySelector(this.UiSelectors.start);

        this.addEventListeners();
    }

    addEventListeners() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => this.openCard(card))
        })
        this.startButton.addEventListener('click', () => {
            this.startGame()
        })
    }

    startGame() {
        this.startWrap.classList.add('start-wrap--hidden');
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
                        // this.endTime = new Date().getTime();
                        // this.gameTime = ((this.endTime - this.startTime) / 1000).toFixed(2);
                        // alert(`WYGRAŁEŚ !!! Twój czas to ${this.gameTime}`);
                        // location.reload()
                    }
                } else {
                    this.clickCards.forEach(card => card.classList.add('card--hidden'));
                    this.clickCards.length = 0;
                }
                this.cards = this.cards.filter(card => !(card.classList.contains('card--off')))

            }, 1000);
        }
    }
}
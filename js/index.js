class Memory {
    constructor() {
        this.cardColors = ['apple', 'apple', 'banana', 'banana', 'cherry', 'cherry', 'grapefruit', 'grapefruit', 'grapes', 'grapes', 'kiwi', 'kiwi', 'pear', 'pear', 'strawberry', 'strawberry', 'watermelon', 'watermelon'];

        this.startTime = new Date().getTime();
        this.gamePairs = this.cardColors.length / 2;
        this.gameResult = 0;

        this.cards = [...document.querySelectorAll('[data-card]')];
    }

    initializeGame() {
        this.cards.forEach(card => {
            const index = Math.floor(Math.random() * this.cardColors.length);
            card.classList.add(`card--${this.cardColors[index]}`);
            this.cardColors.splice(index, 1);
        })
        setTimeout(() => {
            this.cards.forEach(card => {
                card.classList.add('card--hidden');
                // card.addEventListener('click', openCard)
            })
        }, 2000)
    }
}
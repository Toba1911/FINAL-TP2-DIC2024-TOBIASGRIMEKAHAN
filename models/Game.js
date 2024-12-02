class Game {
    constructor() {
        this.games = [];
        this.sales = [];
        this.idCounter = 1; 
    }

    createGame(game) {
        game.id = this.idCounter++;
        this.games.push(game);
        return game;
    }

    getAllGames() {
        return this.games;
    }

    createSale(sale) {
        this.sales.push(sale);
        return sale;
    }

    getSales() {
        return this.sales;
    }
}

export default Game;

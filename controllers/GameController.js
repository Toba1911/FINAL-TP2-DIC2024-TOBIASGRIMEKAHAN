import GameService from "../services/GameService.js";

class GameController {
    constructor() {
        this.gameService = new GameService();
    }

    async registerGame(req, res) {
        try {
            const game = await this.gameService.registerGame(req.body);
            res.status(201).json(game);
        } catch (error) {
            res.status(400).json({ errorMsg: error.message });
        }
    }

    async registerSale(req, res) {
        try {
            const sale = await this.gameService.registerSale(req.body);
            res.status(201).json(sale);
        } catch (error) {
            res.status(400).json({ errorMsg: error.message });
        }
    }

    async listInventory(req, res) {
        try {
            const inventory = await this.gameService.getInventory();
            res.status(200).json(inventory);
        } catch (error) {
            res.status(500).json({ errorMsg: error.message });
        }
    }

    async getSalesStats(req, res) {
        try {
            const stats = await this.gameService.getSalesStats();
            res.status(200).json(stats);
        } catch (error) {
            res.status(500).json({ errorMsg: error.message });
        }
    }

    async getTotalUnitsSold(req, res) {
        try {
            const totalUnits = await this.gameService.getTotalUnitsSold();
            res.status(200).json({ totalUnitsSold: totalUnits });
        } catch (error) {
            res.status(500).json({ errorMsg: error.message });
        }
    }
}

export default GameController;

import { Router } from "express";
import GameController from "../controllers/GameController.js";

const routes = Router();
const gameController = new GameController();

routes.post("/games", (req, res) => gameController.registerGame(req, res));
routes.post("/sales", (req, res) => gameController.registerSale(req, res));
routes.get("/inventory", (req, res) => gameController.listInventory(req, res));
routes.get("/stats", (req, res) => gameController.getSalesStats(req, res));
routes.get("/stats/total-units", (req, res) => gameController.getTotalUnitsSold(req, res));

export default routes;

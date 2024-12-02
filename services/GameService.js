import Game from "../models/Game.js";
class GameService {
    constructor() {
        this.game = new Game();
    }

    async validateGameData(data) {
        const { nombre, categoria, precio, stock } = data;
    
        const categoriasPermitidas = ["estrategia", "rol", "cartas", "familiar"];
        
        if (
            !nombre || 
            typeof nombre !== "string" || 
            nombre.trim() === "" ||
            !categoria || 
            typeof categoria !== "string" || 
            !categoriasPermitidas.includes(categoria) ||
            typeof precio !== "number" || 
            precio <= 0 || 
            typeof stock !== "number" || 
            stock <= 0
        ) {
            throw new Error("Los datos ingresados no son válidos. Verifica los valores.");
        }
    }

    async registerGame(data) {
        await this.validateGameData(data);

        const newGame = {
            id: null, 
            nombre: data.nombre,
            categoria: data.categoria,
            precio: data.precio,
            stock: data.stock,
        };

        return this.game.createGame(newGame);
    }

    async registerSale(saleData) {
        const { idJuego, cantidadVendida } = saleData;

        if (!idJuego || !Number.isInteger(idJuego)) throw new Error("El ID del juego es inválido.");
        if (!Number.isInteger(cantidadVendida) || cantidadVendida <= 0) throw new Error("La cantidad vendida es inválida.");

        const game = this.game.getAllGames().find((g) => g.id === idJuego);
        if (!game) throw new Error("Juego no encontrado.");
        if (cantidadVendida > game.stock) throw new Error("Stock insuficiente.");

        game.stock -= cantidadVendida;

        return this.game.createSale({
            idJuego,
            cantidadVendida,
        });
    }

    async getInventory() {
        return this.game.getAllGames();
    }

    async getSalesStats() {
        const sales = this.game.getSales();
        const stats = {};
    
        sales.forEach((sale) => {
            const game = this.game.getAllGames().find((g) => g.id === sale.idJuego);
    
            if (game) {
                if (stats[game.categoria]) {
                    stats[game.categoria] += sale.cantidadVendida;
                } else {
                    stats[game.categoria] = sale.cantidadVendida;
                }
            }
        });
    
        const formattedStats = { unidadesVendidas: [] };
        for (const categoria in stats) {
            formattedStats.unidadesVendidas.push({ [categoria]: stats[categoria] });
        }
    
        return formattedStats;
    
    }
    async getTotalUnitsSold() {
        const sales = this.game.getSales();
        return sales.reduce((total, sale) => total + sale.cantidadVendida, 0);
    }
}

export default GameService;

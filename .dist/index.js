"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Startsidan
app.get('/', (_, res) => {
    res.send('Hello World');
});
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
const products_1 = __importDefault(require("./routes/products"));
app.use('/products', _1.default);
// Port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

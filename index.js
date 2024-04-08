import express from 'express';
import cors from 'cors';
import rotaCategoria from './Rotas/rotaCategoria.js';
import rotaProduto from './Rotas/rotaProduto.js';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaPedido from './Rotas/rotaPedido.js';
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Seguranca/autenticacao.js';
import rotaCliente from './Rotas/rotaCliente.js';

const host='0.0.0.0';
const porta='4000';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login',rotaLogin);
//verificarAcesso passa a ser middleware = camada do meio
app.use('/cliente',rotaCliente);
app.use('/categoria',/*verificarAcesso,*/rotaCategoria);
app.use('/produto',/*verificarAcesso,*/rotaProduto);
app.use('/pedido',/*verificarAcesso,*/rotaPedido);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})

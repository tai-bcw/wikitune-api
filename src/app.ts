import express from 'express';
import dotenv from 'dotenv'
import ROUTES from './api/routes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({}))

app.use('/wikipedia', ROUTES.wikipediaRoutes);
app.use('/btc_wiki', ROUTES.bitcoinWikiRoutes);
app.use('/fandom', ROUTES.fandomWikiRoutes);
app.use('/gaia', ROUTES.gaiaRoutes);

// Listening
const PORT = process.env.APP_PORT || 8888;
console.log(`Listening On: ${PORT}`);
app.listen(PORT);

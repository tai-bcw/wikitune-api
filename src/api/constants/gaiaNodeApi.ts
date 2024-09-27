import dotenv from 'dotenv';

dotenv.config();

const V1 = `v1`;
const VERSION = V1;
const CHAT : string = `/${VERSION}/chat/completions`;
const EMBEDDINGS : string = `/${VERSION}/embeddings`;
const RETRIEVE : string = `/${VERSION}/retrieve`;
const MODELS : string = `/${VERSION}/models`;
const NODE_INFO : string = `/${VERSION}/info`;

export const GAIA_NODE_URL_ROOT = process.env.GAIA_NODE_URL_ROOT || 'https://llama.us.gaianet.network'; 

export const GAIA_ENDPOINTS = {
    CHAT,
    EMBEDDINGS,
    RETRIEVE,
    MODELS,
    NODE_INFO
};

export const REQ_HEADERS = {
    "accept" : "application/json",
    "Content-Type" : "application/json"
}

export const MAX_CHARACTERS = 8000;
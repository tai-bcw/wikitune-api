import axios from 'axios';
import { GAIA_ENDPOINTS } from '../api/constants/gaiaNodeApi';


const GAIA_NODE_URL_ROOT = 'https://llama.us.gaianet.network';

const REQ_HEADERS = {
  "accept" : "application/json",
  "Content-Type" : "application/json"
};

async function simpleInfoQueryToGaiaNodePublic() {
  const URL = `${GAIA_NODE_URL_ROOT}${GAIA_ENDPOINTS.NODE_INFO}`
  try {
    const nodeInfo = await axios({
        method: "POST",
        url:URL,
        headers: REQ_HEADERS
    });

    console.log(nodeInfo.data);
    
    // console.log(`NodeInfo`, nodeInfo.data, nodeInfo);
  } catch(error) {
    console.log(error.code);
    
  }
}


async function chatTestGaia() {
    const URL = `${GAIA_NODE_URL_ROOT}${GAIA_ENDPOINTS.CHAT}`;
    const DATA = {
      messages: [
        {
            role: "system",
            content: "You are a test maker. Please respond in JSON structures"
        },
        {
            role: "user",
            content: "What is the curve Ethereum uses?"
        }
      ]
    }

    try {
      const nodeInfo = await axios({
          method: "POST",
          url:URL,
          headers: REQ_HEADERS,
          data: DATA
      });
  
      console.log(nodeInfo.data.choices);
      
      // console.log(`NodeInfo`, nodeInfo.data, nodeInfo);
    } catch(error) {
      console.log(error.code);
      
    }
}

chatTestGaia()
import axios from 'axios';
import { GaiaQuery } from "../../interfaces/helperInterfaces";
import { REQ_HEADERS } from '../constants/gaiaNodeApi';
import { GAIA_ENDPOINTS } from '../constants/gaiaNodeApi';
import dotenv from 'dotenv';
import { convertPSVtoCSV, convertPSVtoJSON, convertPSVToSFT } from '../../utils/stringUtils';
import { GAIA_NODE_URL_ROOT } from '../constants/gaiaNodeApi';

dotenv.config();

export default class GaiaNodeHelper {
    messages : GaiaQuery[] = [];
    queryMaxCount : number;
    finishedRequestTally : number = 0;
    erroredRequests : GaiaQuery[] = [];
    nodeURL : string;
    successRequests : any[] = []; //to-do: stop being shit
    finalString : string = "";

    constructor(
        gaiaMessages : GaiaQuery[]
    ){
      this.messages = gaiaMessages;
      this.queryMaxCount = this.messages.length;
    }

   async getNodeInfo() {
     //to-do: De-Hackify (-athon) this
     const query = {
        url: `${GAIA_NODE_URL_ROOT}${GAIA_ENDPOINTS.NODE_INFO}`,
        method: 'POST',
        headers: REQ_HEADERS
     }

     const resp = await axios(query);

     return resp.data;
   }

    tallyReqSuccess() {
        this.finishedRequestTally += 1;
    }

    addError(request : GaiaQuery) {
        this.erroredRequests.push(request);
    }

    async makeChatRequestToNode(message : any) {
        const url = `${GAIA_NODE_URL_ROOT}${GAIA_ENDPOINTS.CHAT}`;
        const config = {
            method: "POST",
            url: url,
            headers: REQ_HEADERS,
            data: message
        }

        try {
            console.log(`requesting : `, config.url);
            const gaiaResponse = await axios(config);
            console.log(`Finished`);
            
            return gaiaResponse.data;
        } catch (err) {
            this.addError(message);
            console.log(`LLM Err:`, err);
            
            return {caught_error: true}
        }
    }

    async runRequestsOnFullSet(messages : GaiaQuery[]) {
        for (let msg of messages ) {
            const resp = await this.makeChatRequestToNode(msg);
            if (resp.caught_error || resp.choices.length <= 0) {
                continue;
            } else {                
                //console.log(resp.choices[0].message.content);
                
                if (this.finishedRequestTally === 0) {                  
                  this.finalString += resp.choices[0].message.content;
                } else {
                    const unProcArr = resp.choices[0].message.content.split('\n');
                    unProcArr.map((dat)=>{return dat.endsWith('|')? dat.slice(0, dat.length - 1) : dat})
                    const procString = unProcArr.slice(1, unProcArr.length).join("\n");
                    this.finalString += procString + '\n';
                }

                this.finishedRequestTally += 1;
            }
        }
    }


    async imperativeRun(messages) {
        this.runRequestsOnFullSet(messages);
        return this.finalString;
    }

    async run() {
        await this.runRequestsOnFullSet(this.messages);
        return this.finalString;
    }

    parseToCSV() {
      return convertPSVtoCSV(this.finalString);
    }

    parseToSFT() {
      return convertPSVToSFT(this.finalString);
    }
    
    parseToJSON() {
      return convertPSVtoJSON(this.finalString);
    }
}
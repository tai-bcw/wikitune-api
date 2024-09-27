import GaiaNodeHelper from "../helpers/GaiaNodeHelper";
import {
    GAIA_NODE_URL_ROOT
} from '../constants/gaiaNodeApi';
// This service handles everything 'except' chat

export default class GaianetService {
    gaiaHelper: GaiaNodeHelper;

    constructor(nodeDomain : string = GAIA_NODE_URL_ROOT) {
      this.gaiaHelper = new GaiaNodeHelper([])
    }

    async nodeInfo() {
      // to-do: flexible node whatevers
      const nodeInfo = await this.gaiaHelper.getNodeInfo();
      
      return nodeInfo;
    }
}
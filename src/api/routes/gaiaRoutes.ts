import {
    Router,
    Request,
    Response 
  } from "express";
  import GaianetService from "../services/GaianetService";
  
  
  const routes = Router();

const  DELAYTIME = 432000000;

const nodeInfoSocket = {
  data: {},
  created_at: 0
}

routes.get('/', async (req : Request, res : Response) => {
    res.status(200).send({msg: 200});
})

routes.get('/node_info', async (req :Request, res: Response)=>{
  let nodeInfo = nodeInfoSocket.data;
  const now = new Date().getTime();

  try {
    if (now > nodeInfoSocket.created_at + DELAYTIME ) {
        const service = new GaianetService();
        nodeInfo = await service.nodeInfo();
        nodeInfoSocket.data = nodeInfo
        nodeInfoSocket.created_at = new Date().getTime();
    }
  
    res.status(200).send(nodeInfo);

  } catch (err) {
    console.log(err);
    
    res.status(500).send("Server Error")
  }
})
  
  export default routes;
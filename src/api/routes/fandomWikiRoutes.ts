import {
  Router,
  Request,
  Response 
} from "express";


const routes = Router();

routes.get('/', async (req : Request, res : Response) => {
    res.status(200).send({msg: 200});
})

export default routes;
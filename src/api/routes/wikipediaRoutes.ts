import { Request, Response, Router } from "express";
import WikipediaService from "../services/WikipediaService";

const routes = Router();

routes.get('/', async (req : Request, res : Response) => {
    res.status(200).send({msg: 200})
});

routes.get('/article/queries_list', async (req : Request, res : Response)=> {
      
    //@ts-ignore
    const subject : string = req.query.subject;

    if (!subject) {
        res.status(400).send({msg: 400});
        return;
    };

    try {
      const WikiService = new WikipediaService(subject);
      const queryList = await WikiService.getQueries();

      res.status(200).send({queries_list: queryList, queries_count: queryList.length});
      return;
    } catch (error) {
      res.status(301).send({msg: 'No Article Found'});
      return;
    }
})



routes.get('/article/parse', async (req : Request, res : Response)=> {
    
    //@ts-ignore
    const subject : string = req.query.subject;

    if (!subject) {
        res.status(400).send({msg: 400});
        return;
    };

    try {
      const start = new Date().getTime();
      const WikiService = new WikipediaService(subject);
      const parsedSubject = await WikiService.runFullParse();
      const end = new Date().getTime();

      res.status(200).send({parse: parsedSubject, parseTime: end - start});
      return;
    } catch (error) {
      res.status(301).send({msg: 'No Article Found'});
      return;
    }


})

export default routes;
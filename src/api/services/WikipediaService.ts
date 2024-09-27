import { PROMPT_SYSTEM_START } from "../constants/gaiaPrompts";
import { knownPageOnArticle } from "../../tests/wikiplib";
import { PromptBuilder } from "../helpers/PromptBuilder";
import GaiaNodeHelper from "../helpers/GaiaNodeHelper";

export default class WikipediaService {
    subject : string;
    article : any;
    pb : PromptBuilder;

    constructor(subject : string) {
      this.subject = subject;
    }

    async init() {  
      this.article = await knownPageOnArticle(this.subject);
    }

    async getQueries() {
        const article = await knownPageOnArticle(this.subject);
        const PB = new PromptBuilder(this.subject, article, PROMPT_SYSTEM_START);
        const queries = PB.buildQueries();

        return queries;
    }

    async runFullParse() {
        const article = await knownPageOnArticle(this.subject);    
        const PB = new PromptBuilder(this.subject, article, PROMPT_SYSTEM_START);
        const queries = PB.buildQueries();
        
        const GNH = new GaiaNodeHelper(queries);
        
        await GNH.run();
    
        const csvParse = GNH.parseToCSV();
        const sftParse = GNH.parseToSFT();
        const jsonParse = GNH.parseToJSON();

        return {
            csvParse,
            sftParse,
            jsonParse
        }
    }

    

}
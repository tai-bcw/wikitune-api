import { PromptBuilder } from "../api/helpers/PromptBuilder";
import { knownPageOnArticle } from "./wikiplib";
import { PROMPT_SYSTEM_START } from "../api/constants/gaiaPrompts";
import GaiaNodeHelper from "../api/helpers/GaiaNodeHelper";
import { convertPSVToArray, convertPSVtoCSV, convertPSVToSFT, convertPSVtoJSON } from '../utils/stringUtils';

// This is used as a test since it is one of the biggest wikipedia pages available
//const TEST_SUBJECT = 'Timeline of United States inventions (before 1890)';
const TEST_SUBJECT = 'Green Day';

async function main() {
    const article = await knownPageOnArticle(TEST_SUBJECT);    
    const PB = new PromptBuilder(TEST_SUBJECT, article, PROMPT_SYSTEM_START);
    const queries = PB.buildQueries();
    console.log(queries.length);
    const GNH = new GaiaNodeHelper(queries);
    console.log("Running Requests");
    
    await GNH.run();

    console.log(GNH.parseToCSV());
    console.log(GNH.parseToSFT());
    console.log(GNH.parseToJSON());
    //console.log(GNH.finalString);

}

main();
import { MAX_CHARACTERS } from "../constants/gaiaNodeApi";
import  {
    ROLE_SYSTEM,
    ROLE_USER,
    PROMPT_USER_START
} from "../constants/gaiaPrompts";
import {
    parseTextIntoSections,
    buildRequestChunks
} from "./wikipStruct";

export class PromptBuilder {
    subject : string;
    contentText : string;
    sysPrompt : string;

        
    constructor(subject: string, contentText : string, sysPrompt : string) {      
      this.contentText = contentText; // Content Text that will build the question
      this.sysPrompt = sysPrompt; // Sentence that "primes" the agent
      this.subject = subject;
    }


    createSystemQueryFrame(subject) {
        return `${this.sysPrompt} with expert knowledge of ${subject}.`;
    }
    
    createUserQueryFrame(bodyText : string, subsection : string) {
        return `About section: '${subsection}' ${PROMPT_USER_START} <START_TEXT> ${bodyText} </END_TEXT>`;
    }

    buildQueryManifest() { // This is the raw materials that we will feed an LLM
      
      const parsedSections = parseTextIntoSections(this.contentText);
      const requestChunks = buildRequestChunks(parsedSections, MAX_CHARACTERS, this.subject);
      return requestChunks;
    }

    buildPromptQueryStructure() {
      const requestBodies = this.buildQueryManifest();
      return {
        subject: this.subject,
        body_number: requestBodies.length,
        bodies: requestBodies
      }
    }

    buildQueries() {
      const queries = [];
      const systemPrompt = this.createSystemQueryFrame(this.subject);
      const queryBodies = this.buildPromptQueryStructure();

      for (let i = 0; i < queryBodies.bodies.length; i++) {
        const currBody = queryBodies.bodies[i];
        const userQuery = this.createUserQueryFrame(currBody.body, currBody.section);
        queries.push({
            messages: [
                {role: ROLE_SYSTEM, content: systemPrompt},
                {role: ROLE_USER, content: userQuery}
            ]
        });
      }

      return queries;
    }

}

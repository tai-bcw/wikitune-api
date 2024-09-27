import { removeCharacters, chunkString } from "../../utils/stringUtils";
import { MAX_CHARACTERS } from "../constants/gaiaNodeApi"; 
import { 
    ParsedWikiSection,
    RequestChunks
} from "../../interfaces/helperInterfaces";
// These are potentially useful for other wikis but we will have to break them apart

const SECTIONS_TO_REMOVE = {
    "external links" : true,
    "references" : true,
    "further reading" : true,
    "bibliography" : true
}


export function filterSectionArray(sectionArray : ParsedWikiSection[]) {
  return sectionArray.filter(
    (section)=>{return section.length > 0}
  ).filter(
    (section_inner)=>{ return !SECTIONS_TO_REMOVE[section_inner.title.toLocaleLowerCase()]}
  );
}



export function parseTextIntoSections(text : string) : ParsedWikiSection[] {
    const sections : ParsedWikiSection[] = [];
    const lines : string[] = text.split('\n');
    let currentTitle : string = '';
    let currentBody : string = '';
  
    for (const line of lines) {
      if (line.startsWith('=') && line.endsWith('=')) {
        if (currentTitle) {
          sections.push({
            title: removeCharacters(currentTitle.trim(), "="),
            body: currentBody.trim(),
            length: currentBody.trim().length
          });
        }
        currentTitle = line.slice(1, -1).trim();
        currentBody = '';
      } else {
        currentBody += line + '\n';
      }
    }
  
    if (currentTitle) {
      sections.push({
        title: currentTitle.trim(),
        body: currentBody.trim(),
        length: currentBody.length
      });
    }
  
    return filterSectionArray(sections);
}



export function buildRequestChunks(
    parsedSections : ParsedWikiSection[],
    maxSize = 3000,
    subject="unknown"
) : RequestChunks[] {
   
   const requestPackages = [];
  
  for (let i = 0; i < parsedSections.length; i++) {
    const section = parsedSections[i];

    // to-do: Add in chunking on sentence breaks.
    const stringChunks = chunkString(section.body, maxSize);
    
    for (let str_bod of stringChunks) {
      requestPackages.push({
        subject: subject,
        section: section.title,
        body: str_bod,
        characters: str_bod.length
      });
    }
  }

   return requestPackages;
}
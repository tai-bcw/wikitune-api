import wiki, { pageError } from 'wikipedia';

async function unknownPageOnArticle() {
    console.log("Checking Known Page Query");
    
    try {
      const page = await wiki.page('asdfasdfasdfasdfasdf');
      console.log(page); // to-do: logger
      const summary = await page.summary();
      console.log(summary);
      const content = await page.content();
      console.log(content);
      
    } catch(error) {
      if (error.name === "pageError") {
        //handle not found
        console.log("Entry Not Found");
      } else {
        // Unknown Error
        console.log("Unknown Error");
        console.log(error);
      }
    }
};


async function knownPageOnArticle(subject : string) {

    try {
      const page = await wiki.page(subject);
      //console.log(page); // to-do: logger
      //const summary = await page.summary();
      //console.log(summary);
      const content = await page.content();
      //console.log(content);
      //const categories = await page.categories();
      //console.log(categories);

      return content;
      
    } catch(error) {
      if (error.name === "pageError") {
        //handle not found
        console.log("Entry Not Found");
      } else {
        // Unknown Error
        console.log("Unknown Error");
        console.log(error);
      }
    }
};

export {
    knownPageOnArticle
}
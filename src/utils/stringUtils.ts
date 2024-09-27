export function removeCharacters(inputString, charactersToRemove) {
    const regString = `[${charactersToRemove.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}]`
    const regex = new RegExp(regString, 'g');
    const dechar = inputString.replace(regex, '');
    const trimmed = dechar.trim();

    return trimmed
}

export function chunkString(str : string, chunkSize : number) {
    const chunks = [];
    let index = 0;
  
    while (index < str.length) {
      chunks.push(str.slice(index, index + chunkSize));
      index += chunkSize;
    }
  
    return chunks;
}

export function convertPSVToArray(psvString : string) {
    let datArr =  psvString.split('\n').map(proc=>proc.split('|'));
    datArr = datArr.filter(dat=>dat);
    return datArr;
}

export function convertPSVtoCSV(psvString : string) {
  const rows = psvString.split('\n');
  const csvRows = rows.map(row => {
    const values = row.split('|');

    const escapedValues = values.map(value => {
      const trimmedValue = value.trim();
      if (trimmedValue.includes(',') || trimmedValue.includes('"')) {
        return `"${trimmedValue.replace(/"/g, '""')}"`;
      }
      return trimmedValue;
    });
    
    return escapedValues.join(',');
  });
  
  return csvRows.join('\n');
}

export function convertPSVtoJSON(psvString : string) {
    const procRows = convertPSVToArray(psvString);
    const headers = procRows[0];
    const data = procRows.slice(1, procRows.length);
    return data.filter(d=>d.length>=2).map(dat=>{return {
        [headers[0].toLocaleLowerCase().trim()] : dat[0].trim(),
        [headers[1].toLocaleLowerCase().trim()] : dat[1].trim()}
    });
}

export function convertPSVToSFT(psvString : string) {
    const procRows = convertPSVToArray(psvString);

    const final = procRows.slice(1, procRows.length)
      .filter(p=>p.length>=2)
      .map(proc=>`<SFT><s>[INST] ${proc[0].trim()} [/INST] ${proc[1].trim()}.`.replace('..','.'))
      .join('\n');
    
    
    return final
}
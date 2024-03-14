export const getParameterByName = (name: string): string => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};


export const areArraysEqualLength = (...arrays: any[][]): boolean => {
  if (arrays.length < 2) {
    // At least two arrays are required for comparison
    throw new Error('At least two arrays are required for comparison.');
  }

  const firstArrayLength = arrays[0].length;

  for (let i = 1; i < arrays.length; i++) {
    if (arrays[i].length !== firstArrayLength) {
      return false; // Arrays have different lengths
    }
  }

  return true; // All arrays have equal lengths
}

export const convertEpochToDateTime = (epochTime: number): string => {
  const date = new Date(epochTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
};

export const transformResolutionAsPerBE = (resolution : string): string =>{
  let modifiedResolution = '';

  return modifiedResolution;
};

export const getApiEP = (key: string, params?: string) : string =>{
  let EP = `/api/${key}`;
  if(params)
      EP = EP + '?' + params;
  return EP;
};

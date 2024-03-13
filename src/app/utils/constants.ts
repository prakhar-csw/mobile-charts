export const DATA_FEED_URL='http://localhost:3000/api';

export const DUMMY_SYMBOL='TATAMOTORS';

export const SUPPORTED_RESOLUTIONS = ["1","2","5","30","D", "2D", "3D", "W", "3W", "M", "6M"];

export const getApiEP = (key: string, params?: string) : string =>{
    let EP = `/api/${key}`;
    if(params)
        EP = EP + '?' + params;
    return EP;
};
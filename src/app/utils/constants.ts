export const DATA_FEED_URL='http://localhost:3000/api';

export const DUMMY_SYMBOL='TATAMOTORS';

export const SUPPORTED_RESOLUTIONS = ["5S", "15S", "1", "D"];

// export const SUPPORTED_RESOLUTIONS = ['5S','15S','30S','1','2','3','4','5','10','15','20','25','30','45','60','75','120','125','180','240','1D','1W'];


export const resolutionMapping: {[key: string] : string} = {
    S: <string> 's', //second
    D: <string> 'd', // day
    W: <string> 'W', // week
    M: <string> 'M', // month
}; 


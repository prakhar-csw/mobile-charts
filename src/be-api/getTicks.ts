export const getTicks = async (symbol: string, start: string, end: string, interval: string) => {
    const url = "https://ie-uat.coinswitch.co/cskservices-market/chart";
    const body = {   
        request: {
            data: {
                symbol: symbol,
                start: start,
                end: end,
                interval: interval,
            },
            appID: 'a2be9deacaff095ec897e5f1488198a9'
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         'X-ENCRYPT': 'false',
        },
        body: JSON.stringify(body),
      });

    const responseData = await response.json();
    const ticksInfo = responseData.response;
    return ticksInfo;
 };

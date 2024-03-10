export const getSymbolData = async (symbol: string) => {
  const url =
    "https://ie-uat.coinswitch.co/cskservices-market/Search/SymbolSearch/1.0.0";
  const body = {
    request: {
      data: {
        searchString: symbol,
      },
      appID: "a2be9deacaff095ec897e5f1488198a9",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ENCRYPT": "false",
        // Add any additional headers if needed 
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    const stockInfo = responseData?.response?.data?.symbolList?.[0] || null;

    return stockInfo;
  } catch (error) {
    console.error('Error happened while fetching the data');
  }
};

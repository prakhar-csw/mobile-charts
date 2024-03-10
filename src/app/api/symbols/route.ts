import { getSymbolData } from '../../../be-api/getSymbolData';
import { NextRequest, NextResponse } from "next/server";

interface StockInformationInterface {
    symbol: string,
    dispPriceTick: string,
    lotSize: string,
    multiplier: number,
    streamSym: string,
    nIssueRate: number,
    assetClass: string,
    sectorName: string,
    compName: string,
    token: string,
    divisor: string,
    mktSegId: string,
    coCode: string,
    marketCapType: string,
    series: string,
    exch: string,
    expiry: string,
    id: string,
    instName: string,
    surveillanceMsg: string,
    symbolToken: string,
    strikePrice: string,
    isin: string,
    option: string,
}

const getPriceData = (stockInformation: StockInformationInterface) => {
    return {
        name: stockInformation.symbol,
        'exchange-traded': stockInformation.exch,
        'exchange-listed': stockInformation.exch,
        timezone: 'America/New_York',
        minmov: 1,
        minmov2: 0,
        noData: false,
        pointvalue: 1,
        session: '0930-1630',
        has_intraday: false,
        visible_plots_set: 'ohlcv',
        description: stockInformation.compName, 
        type: stockInformation.instName,
        supported_resolutions: ['D', '2D', '3D', 'W', '3W', 'M', '6M'],
        pricescale: 100,
        ticker: stockInformation.symbol,
        logo_urls: ['https://s3-symbol-logo.tradingview.com/apple.svg'], 
        exchange_logo: 'https://s3-symbol-logo.tradingview.com/country/US.svg',
    }
};

export async function GET (request: NextRequest){
    const symbol: string = request.nextUrl.searchParams.get('symbol') || '';
    if(!symbol){
        return NextResponse.json({
            err : 'Please provide the symbol',
        });
    }
    const stockInformation : StockInformationInterface = await getSymbolData(symbol);
    return NextResponse.json(getPriceData(stockInformation));
}


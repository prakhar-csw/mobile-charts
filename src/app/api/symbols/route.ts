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

export async function GET (request: NextRequest){
    const symbol: string = request.nextUrl.searchParams.get('symbol') || '';
    if(!symbol){
        return NextResponse.json({
            err : 'Please provide the symbol',
        });
    }
    const stockInformation : StockInformationInterface = await getSymbolData(symbol);
    return NextResponse.json(stockInformation);
}


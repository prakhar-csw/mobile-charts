// api > hello > [slug] > route.ts
import {NextRequest, NextResponse} from "next/server";

const getPriceData = (symbol: string) => {
    return {
        name: symbol,
        'exchange-traded': 'NasdaqNM',
        'exchange-listed': 'NasdaqNM',
        timezone: 'America/New_York',
        minmov: 1,
        minmov2: 0,
        pointvalue: 1,
        session: '0930-1630',
        has_intraday: false,
        visible_plots_set: 'ohlcv',
        description: symbol,
        type: 'stock',
        supported_resolutions: ['D', '2D', '3D', 'W', '3W', 'M', '6M'],
        pricescale: 100,
        ticker: symbol,
        logo_urls: ['https://s3-symbol-logo.tradingview.com/apple.svg'],
        exchange_logo: 'https://s3-symbol-logo.tradingview.com/country/US.svg',
    };
};

export async function GET (request: NextRequest,{params}:{ params: { slug: string } } ){
    const symbol = request.nextUrl.searchParams.get('symbol') || '';
    if(!symbol){
        return NextResponse.json({
            err : 'Please provide the symbol',
        });
    }
    return NextResponse.json(getPriceData(symbol));
}
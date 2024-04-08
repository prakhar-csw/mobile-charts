import { IStockInformationInterface } from '@/app/utils/TVutilities';
import { getSymbolData } from '../../../be-api/getSymbolData';
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest){
    const symbol: string = request.nextUrl.searchParams.get('symbol') || '';
    if(!symbol){
        return NextResponse.json({
            err : 'Please provide the symbol',
        });
    }
    const stockInformation : IStockInformationInterface | undefined = await getSymbolData(symbol);
    return NextResponse.json(stockInformation);
}


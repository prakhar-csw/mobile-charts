import {NextRequest, NextResponse} from "next/server";

export const getResponse = () =>{
    return [
        {
          "id": "tsm1",
          "time": 1522108800,
          "color": "#F23645",
          "label": "A",
          "tooltip": ""
        },
        {
          "id": "tsm2",
          "time": 1521763200,
          "color": "#2962FF",
          "label": "D",
          "tooltip": [
            "Dividends: $0.56",
            "Date: Fri Mar 23 2018"
          ]
        },
        {
          "id": "tsm3",
          "time": 1521504000,
          "color": "#089981",
          "label": "D",
          "tooltip": [
            "Dividends: $3.46",
            "Date: Tue Mar 20 2018"
          ]
        },
        {
          "id": "tsm4",
          "time": 1520812800,
          "color": "#F23645",
          "label": "E",
          "tooltip": [
            "Earnings: $3.44",
            "Estimate: $3.60"
          ],
          "shape": "earningDown"
        },
        {
          "id": "tsm7",
          "time": 1519516800,
          "color": "#089981",
          "label": "E",
          "tooltip": [
            "Earnings: $5.40",
            "Estimate: $5.00"
          ],
          "shape": "earningUp"
        },
        {
          "id": "tsm8",
          "time": 1519516800,
          "color": "#FF9800",
          "label": "S",
          "tooltip": [
            "Split: 4/1",
            "Date: Sun Feb 25 2018"
          ]
        }
      ]
};

//Responsible for pagination will look later why it is failing.

export async function GET (request: NextRequest,{params}:{ params: { slug: string } } ){
    const symbol = request.nextUrl.searchParams.get('symbol') || '';
    const from = request.nextUrl.searchParams.get('from') || '';
    const to = request.nextUrl.searchParams.get('to') || '';
    const resolution = request.nextUrl.searchParams.get('resolution') || '';

    if(!symbol){
        return NextResponse.json({
            err : 'Please provide the symbol',
        });
    }
    return NextResponse.json(getResponse());
}
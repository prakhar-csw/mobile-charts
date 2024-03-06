import React from "react";
import { initOnReady, removeWhenExit } from "./utilityFunctions";

export interface ChartModule {
    dataFeedUrl: string,
    assetSymbol: string,


    element: React.ReactElement;
    init(dataFeedUrl: string): void;
    dataFeed(): void;
    renderUI(): React.ReactElement;
    remove(): void;
}

// export const createChartModule = (): ChartModule => {
//     const ChartModule: ChartModule = {
//         dataFeedUrl:'',
//         element: React.createElement(
//             'div',
//             { className: 'h-full',id: 'tv_chart_container' },
//         ),

//         // Responsible to initialize charts pre-requisites
//         init: function(this: ChartModule, dataFeedUrl: string): void {
//             this.dataFeedUrl = dataFeedUrl;
//         },

//         //Responsible for feeding data to chart 
//         dataFeed: function(): void {
//             initOnReady(this.dataFeedUrl);
//         },

//         //Renders the ui on screen
//         renderUI: function() : React.ReactElement {
//             return this.element;
//         },

//         //Remove charts when completed.
//         remove: function() : void {
//             removeWhenExit();
//         }
//     }
//     return ChartModule;
// }


export function createChartModule2(this: ChartModule): void{
    this.dataFeedUrl = '';
    this.assetSymbol= '',
    this.element = React.createElement(
        'div',
        { className: 'h-full',id: 'tv_chart_container' },
    );
};

createChartModule2.prototype.init = function(this: ChartModule, dataFeedUrl: string, assetSymbol: string): void {
    this.dataFeedUrl = dataFeedUrl;
    this.assetSymbol = assetSymbol;
};

createChartModule2.prototype.dataFeed= function(this: ChartModule): void {
    initOnReady(this.dataFeedUrl, this.assetSymbol);
};

createChartModule2.prototype.renderUI= function(this: ChartModule) : React.ReactElement {
    return this.element;
};

createChartModule2.prototype.remove = function() : void {
    removeWhenExit();
};


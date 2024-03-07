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


export function createChartModule(this: ChartModule): void{
    this.dataFeedUrl = '';
    this.assetSymbol= '',
    this.element = React.createElement(
        'div',
        { className: 'h-full',id: 'tv_chart_container' },
    );
};

createChartModule.prototype.init = function(this: ChartModule, dataFeedUrl: string, assetSymbol: string): void {
    this.dataFeedUrl = dataFeedUrl;
    this.assetSymbol = assetSymbol;
};

createChartModule.prototype.dataFeed= function(this: ChartModule): void {
    initOnReady(this.dataFeedUrl, this.assetSymbol);
};

createChartModule.prototype.renderUI= function(this: ChartModule) : React.ReactElement {
    return this.element;
};

createChartModule.prototype.remove = function() : void {
    removeWhenExit();
};


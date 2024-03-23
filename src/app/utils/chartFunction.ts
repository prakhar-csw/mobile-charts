import React from "react";
import { initOnReady, removeWhenExit } from "./TVutilities";

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
    this.assetSymbol= '',
    this.element = React.createElement(
        'div',
        { className: 'h-full',id: 'tv_chart_container' },
    );
};

createChartModule.prototype.init = function(this: ChartModule, assetSymbol: string): void {
    this.assetSymbol = assetSymbol;
};

createChartModule.prototype.dataFeed= function(this: ChartModule): void {
    initOnReady(this.assetSymbol);
};

createChartModule.prototype.renderUI= function(this: ChartModule) : React.ReactElement {
    return this.element;
};

createChartModule.prototype.remove = function() : void {
    removeWhenExit();
};


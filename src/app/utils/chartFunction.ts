import React from "react";
import { initOnReady, removeWhenExit } from "./TVutilities/index";

export interface ChartModule {
    theme: string,
    assetSymbol: string,
    element: React.ReactElement;
    init(assetSymbol: string, theme: string): void;
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

createChartModule.prototype.init = function(this: ChartModule, assetSymbol: string, theme: string): void {
    this.assetSymbol = assetSymbol;
    this.theme = theme;
};

createChartModule.prototype.dataFeed= function(this: ChartModule): void {
    initOnReady(this.assetSymbol, this.theme);
};

createChartModule.prototype.renderUI= function(this: ChartModule) : React.ReactElement {
    return this.element;
};

createChartModule.prototype.remove = function() : void {
    removeWhenExit();
};


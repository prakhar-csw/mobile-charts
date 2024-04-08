import React from "react";
import { initOnReady, removeWhenExit } from "./TVutilities/index";
import { IChartModule } from "./TVutilities";

export function createChartModule(this: IChartModule): void{
    this.assetSymbol= '',
    this.element = React.createElement(
        'div',
        { className: 'h-full',id: 'tv_chart_container' },
    );
};

createChartModule.prototype.init = function(this: IChartModule, assetSymbol: string, theme: string): void {
    this.assetSymbol = assetSymbol;
    this.theme = theme;
};

createChartModule.prototype.dataFeed= function(this: IChartModule): void {
    initOnReady(this.assetSymbol, this.theme);
};

createChartModule.prototype.renderUI= function(this: IChartModule) : React.ReactElement {
    return this.element;
};

createChartModule.prototype.remove = function() : void {
    removeWhenExit();
};


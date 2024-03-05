import React from "react";
import { initOnReady } from "./utilityFunctions1";

interface ChartModule {
    // isAlreadyInitialized?:boolean,
    dataFeedUrl: string,
    init(dataFeedUrl: string): void;
    dataFeed():void;
    renderUI(): React.ReactElement;
    remove(): void;
}

export const createChartModule = (): ChartModule =>{
    const ChartModule: ChartModule = {
        dataFeedUrl:'',

        init: function(this: ChartModule, dataFeedUrl: string): void {
            this.dataFeedUrl = dataFeedUrl;
        },

        dataFeed: function(): void {
            initOnReady(this.dataFeedUrl);
        },

        renderUI: function() : React.ReactElement {
            return React.createElement(
                'div',
                { className: 'h-full',id: 'tv_chart_container' },
            );
        },

        remove: function() : void {
            // removeWhenExit();
        }
    }
    return ChartModule;
}

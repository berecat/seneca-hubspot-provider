declare type HubspotProviderOptions = {};
declare function HubspotProvider(this: any, options: HubspotProviderOptions): {
    exports: {
        sdk: () => any;
    };
};
export default HubspotProvider;

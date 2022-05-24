import { Component, Binding, Application } from '@loopback/core';
export declare class PaymentComponent implements Component {
    private app;
    bindings: Binding[];
    constructor(app: Application);
}

// const mongoose = require('mongoose'); //mongo connection

import {post} from './api/request.js';

export default class Welcome {
    constructor(symbol) {
        this.symbol = symbol;
        this.getWeight(symbol);
    }

    getWeight(symbol){
        post('/getSymbol', {symbol}).then((weight) => {
            this.weight = weight.data;
        });
    }
    setWeight(weight){
        const symbol = this.symbol;
        post('/setSymbol', {symbol, weight}).then((res) => {
            console.log("success?", res);
        });
    }
};



const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const getProductsFromFile = (cb) => {
    fs.readFile(path.join(rootDir,'data','products.json'),
    (err, fileContent) => {
        if(err){
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(path.join(rootDir,'data','products.json'),
            JSON.stringify(products),
            (err) => {
                console.log(err);
            });
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
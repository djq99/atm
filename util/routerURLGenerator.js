const{readdirSync } = require("fs");
const routerGenerator = (router, source, path) => {
    const subDir = readdirSync(source);
    if(subDir.includes("index.js")) {
        const middlewares = require(source).middlewares;
        if(middlewares && middlewares.length > 0) {
            router[require(source).method](path, require(source).middlewares, require(source).handler);
        } else{
            router[require(source).method](path, require(source).handler);
        }
    }
    for(let i = 0; i < subDir.length; i++) {
        if(!subDir[i].includes(".")) {
            routerGenerator(router, `${source}/${subDir[i]}`, `${path}/${subDir[i]}`);
        }
    }
    return router;
};

module.exports = routerGenerator;

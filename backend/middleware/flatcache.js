const flatCache = require('flat-cache');
flatCache.clearAll();

function cacher(name, duration = 20) {
    let cache = flatCache.load(name);
    let time = duration * 60 * 1000;
    let end = new Date().getTime() + time;

    return (req, res, next) => {
        // Refresh cache after certain time frame
        let now = new Date().getTime();
        if(now > end) {
            flatCache.clearCacheById(name);
            cache = flatCache.load(name);
            end = new Date().getTime() + time;
        }

        // Set up cache
        let key = '__express__' + req.originalUrl;
        let cacheContent = cache.getKey(key);

        if(cacheContent) {
            res.send(JSON.parse(cacheContent));
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                cache.setKey(key, body);
                cache.save();
                res.sendResponse(body)
            };

            next();
        }
    };
}

module.exports = cacher;

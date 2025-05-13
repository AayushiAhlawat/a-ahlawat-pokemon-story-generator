// Middleware to log 
const logger = (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);

    // Track request start time
    const start = Date.now();
    // Log response status
    res.on('finish', () => {
        console.log(`-> ${res.statusCode} (${Date.now() - start}ms)`);
    });
    next(); 
};

module.exports = logger;
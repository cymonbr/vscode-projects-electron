const errorHandler = (error, request, response, next) => {
    console.log(error);

    return response.status(500).json({
        message: 'Internal server error'
    });
};

module.exports = errorHandler;
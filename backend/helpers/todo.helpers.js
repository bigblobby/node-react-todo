function getOrder(value){
    switch(value) {
        case 'ph':
            return [['priority', 'DESC']];
        case 'pl':
            return [['priority', 'ASC']];
        case 'a-z':
            return [['title', 'ASC']];
        case 'z-a':
            return [['title', 'DESC']];
        case 'new':
            return [['createdAt', 'DESC']];
        case 'old':
            return [['createdAt', 'ASC']];
        default:
            return [];
    }
}

module.exports = {
    getOrder: getOrder
};

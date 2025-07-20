function parseIsFavourite (value) {
    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    }
    
    return undefined;
}

export default function parseFilterParams (query) {
    const {isFavourite} = query;
    return {
        isFavourite: parseIsFavourite(isFavourite),
    }
}
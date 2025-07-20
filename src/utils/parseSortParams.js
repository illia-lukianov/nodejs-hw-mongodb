function parseSortOrder (value) {
   const defaultValue = 'asc';

    if (value === 'asc' || value === 'desc') {
        return value;
    }

    return defaultValue;
}

function parseSortBy (value) {
    const defaultValue = 'name';
    if (value === 'name' || value === 'isFavourite') {
        return value;
    }

    return defaultValue;
}

export default function parseSortParams (query) {
    const {sortOrder, sortBy} = query;
    return {
        sortOrder: parseSortOrder(sortOrder),
        sortBy: parseSortBy(sortBy),
    }
}
export default function parseSortParams(query) {
    const defaultSortBy = 'name';
    const defaultSortOrder = 'asc';

    const allowedFields = ['name', 'isFavourite'];
    const allowedOrders = ['asc', 'desc'];

    const keys = Object.keys(query);

    const sortBy = keys.find(filter => allowedFields.includes(filter)) || defaultSortBy;
    const sortOrder = allowedOrders.includes(query[sortBy]) ? query[sortBy] : defaultSortOrder;

    return { sortBy, sortOrder };
}
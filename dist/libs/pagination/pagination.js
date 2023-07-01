"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myPagination = (array, page = 1, limit = 1) => {
    console.log(page, limit, '======================');
    if (!Array.isArray(array)) {
        throw `Expect array and got other`;
    }
    if (typeof (page) !== 'number') {
        throw `Expect number and got ${typeof (page)}`;
    }
    if (typeof (limit) !== 'number') {
        throw `Expect number and got ${typeof (limit)}`;
    }
    page = page <= 0 ? 1 : page;
    limit = page <= 0 ? 1 : limit;
    const currentPage = page;
    const perPage = limit;
    const offset = (Number(page) - 1) * Number(perPage);
    const paginatedItems = array.slice(offset, Number(perPage) + Number(offset));
    const totalPages = Math.ceil(array.length / Number(perPage));
    return {
        currentPage,
        perPage,
        total: array.length,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        totalPages,
        docs: paginatedItems
    };
};
exports.default = myPagination;

/**
 * Returns an array of row indices that the given index is on, given a grid of a specified size.
 */
export function getRowIndices(size: number, index: number): number[] {
    const r = [],
        row = Math.floor(index / size);
    for (let i = 0; i < size; i++) r.push(i + row * size);
    return r;
}

/**
 * Returns an array of column indices that the given index is on, given a grid of a specified size.
 */
export function getColumnIndices(size: number, index: number): number[] {
    const r = [],
        col = index % size;
    for (let i = 0; i < size; i++) r.push(col + i * size);
    return r;
}

/**
 * Returns an array of row and column indices that the given index is on, given a grid of size NxN.
 */
export function getPlusIndices(size: number, index: number): number[] {
    return [...getRowIndices(size, index), ...getColumnIndices(size, index)];
}

/**
 * Given an index in an NxN grid, returns the edge indices that bound the row the index is on.
 */
export function getRowEdgeIndices(size: number, index: number): [number, number] {
    return [size + Math.floor(index / size), 4 * size - 1 - Math.floor(index / size)];
}

/**
 * Given an index in an NxN grid, returns the edge indices that bound the column the index is on.
 */
export function getColumnEdgeIndices(size: number, index: number): [number, number] {
    return [index % size, 3 * size - 1 - (index % size)];
}

/**
 * Given an index in an NxN grid, returns the edge indices that bound the axes the index is on.
 */
export function getEdgeIndices(size: number, index: number) {
    return [...getRowEdgeIndices(size, index), ...getColumnEdgeIndices(size, index)];
}

/**
 * Returns a grid cursor tuple from an edge index on an NxN grid, which can be used to iterate over an axis of a grid from an edge.
 * The returned tuple is of the form [index, direction], with 'index' being the grid index where the axis begins, while
 * 'direction' is the per-step increment to it.
 */
export function getGridCursorFromEdgeIndex(size: number, index: number): [number, number] {
    if (index < 0 || index >= size * 4) throw new Error("Invalid edge index for grid size.");

    if (index < size) return [index, size];
    if (index < size * 2) return [size - 1 + size * (index - size), -1];
    if (index < size * 3) return [size * size - 1 - (index - size * 2), -size];
    if (index < size * 4) return [size * (size - 1) - (index - size * 3) * size, 1];

    return [0, 0];
}

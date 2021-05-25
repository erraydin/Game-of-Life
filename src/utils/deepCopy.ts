export const deepCopy = (array: Array<Array<number>>) => {
    return array.map(row => {
        return row.map(elem => {
            return elem;
        })
    })
}

/**
 * @param start {number}
 * @param end {number}
 * @param step {number}
 * @returns {[]}
 */
export const range = (start, end, step = 1) => {
    let newArr = [];
    for(let i = start; i <= end; i += step){
        newArr.push(i);
    }
    return newArr;
};

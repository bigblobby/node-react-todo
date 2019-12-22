export const range = (start, end) => {
    return Array((end + 1) - start)
        .fill()
        .map((_, i) => i + start);
};

// TODO
export const handleDecorate = (entry, editor, decorators) => {
    let ranges = [];
    for (let decorate of decorators) {
        const result = decorate.decorator(entry, editor);
        if (result) {
            return (ranges = ranges.concat(result));
        }
    }
    return ranges;
};
//# sourceMappingURL=handleDecorate.js.map
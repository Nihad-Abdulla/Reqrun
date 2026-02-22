export function parseAssertion(expression) {
    const match = expression.match(/^(\w+)(=|<|>)(\d+)$/);
    if (!match) {
        throw new Error(`Invalid assertion format: ${expression}`);
    }
    const [, field, operator, value] = match;
    return {
        field: field,
        operator: operator,
        value: Number(value),
        raw: expression,
    };
}
//# sourceMappingURL=parser.js.map
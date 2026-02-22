import type { Operator, ParsedAssertion } from "./types.js";


export function parseAssertion(expression: string): ParsedAssertion {
    const match = expression.match(/^(\w+)(=|<|>)(\d+)$/);
    if (!match) {
        throw new Error(`Invalid assertion format: ${expression}`);
    }

    const [, field, operator, value] = match;

    return {
        field: field as string,
        operator: operator as Operator,
        value: Number(value),
        raw: expression,
    };
}
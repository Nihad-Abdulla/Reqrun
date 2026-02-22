

export type Operator = "=" | "<" | ">";

export interface ParsedAssertion {
    field: string;
    operator: Operator;
    value: number;
    raw: string;
}
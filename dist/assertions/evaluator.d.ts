import type { ParsedAssertion } from "./types.js";
interface ResponseMeta {
    status: number;
    time: number;
}
export declare function evaluateAssertions(assertions: ParsedAssertion[], response: ResponseMeta): ({
    expression: string;
    passed: boolean;
    error: string;
} | {
    expression: string;
    passed: boolean;
    error?: never;
})[];
export {};
//# sourceMappingURL=evaluator.d.ts.map
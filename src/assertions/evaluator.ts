import type { ParsedAssertion } from "./types.js";


interface ResponseMeta {
    status: number;
    time: number;
}

export function evaluateAssertions(
    assertions: ParsedAssertion[],
    response: ResponseMeta
) {
    return assertions.map((assertion) => {
        let actualValue: number;

        if (assertion.field === "status") {
            actualValue = response.status;
        } else if (assertion.field === "time") {
            actualValue = response.time;
        } else {
            return {
                expression: assertion.raw,
                passed: false,
                error: `Unknown field: ${assertion.field}`,
            };
        }

        let passed = false;

        switch (assertion.operator) {
            case "=":
                passed = actualValue === assertion.value;
                break;
            case "<":
                passed = actualValue < assertion.value;
                break;
            case ">":
                passed = actualValue > assertion.value;
                break;
        }

        return {
            expression: assertion.raw,
            passed,
        };
    });
}

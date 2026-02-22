export function evaluateAssertions(assertions, response) {
    return assertions.map((assertion) => {
        let actualValue;
        if (assertion.field === "status") {
            actualValue = response.status;
        }
        else if (assertion.field === "time") {
            actualValue = response.time;
        }
        else {
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
//# sourceMappingURL=evaluator.js.map
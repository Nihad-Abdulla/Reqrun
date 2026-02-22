import { Command } from 'commander';
import { buildRequest } from '../core/requestBuilder.js';
import { executeRequest } from '../core/executor.js';
import { parseAssertion } from '../assertions/parser.js';
import { evaluateAssertions } from '../assertions/evaluator.js';
const program = new Command();
program
    .command('test')
    .argument('<api>', 'API endpoint name')
    .argument('<method>', 'HTTP method')
    .argument('[assertions...]', 'Assertions like status=200')
    .option('--env <env>', 'Environment', 'dev')
    .action(async (api, method, assertions, options) => {
    if (!assertions || assertions.length === 0) {
        console.error("❌ No assertions provided.");
        console.error("Usage: reqrun test <api> <method> status=200");
        process.exit(1);
    }
    const requestConfig = buildRequest(api, method, options);
    const result = await executeRequest(requestConfig);
    const parsedAssertions = assertions.map(parseAssertion);
    const results = evaluateAssertions(parsedAssertions, {
        status: result.status,
        time: result.duration
    });
    console.log("\nRunning tests...\n");
    let passedCount = 0;
    let failedCount = 0;
    for (const r of results) {
        if (r.passed) {
            console.log(`✔ ${r.expression}`);
            passedCount++;
        }
        else {
            console.log(`✘ ${r.expression}`);
            failedCount++;
        }
    }
    console.log(`\n${passedCount} passed, ${failedCount} failed\n`);
    process.exit(failedCount === 0 ? 0 : 1);
});
//# sourceMappingURL=index.js.map
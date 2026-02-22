
import { Command } from "commander";
import { buildRequest } from "../core/requestBuilder.js";
import { executeRequest } from "../core/executor.js";
import { parseAssertion } from "../assertions/parser.js";
import { evaluateAssertions } from "../assertions/evaluator.js";

const program = new Command();

program
    .name("reqrun")
    .description("CLI tool to run and test APIs")
    .version("1.0.0");



program
    .command("run")
    .argument("<api>", "API endpoint name")
    .argument("<method>", "HTTP method")
    .option("--username <username>")
    .option("--password <password>")
    .option("--env <env>", "Environment", "dev")
    .action(async (api, method, options) => {
        try {
            const requestConfig = buildRequest(api, method, options);
            const result = await executeRequest(requestConfig);

            if (result.success) {
                console.log("✅ Request Successful");
                console.log("Status:", result.status);
                console.log("Response Time:", result.duration + "ms");
                console.log("Data:", result.data);
            } else {
                console.error("❌ Request Failed");
                console.error("Status:", result.status);
                console.error("Error:", result.error);
                process.exit(1);
            }
        } catch (err: any) {
            console.error("Unexpected Error:", err.message);
            process.exit(1);
        }
    });



program
    .command("test")
    .argument("<api>", "API endpoint name")
    .argument("<method>", "HTTP method")
    .argument("[assertions...]", "Assertions like status=200")
    .option("--env <env>", "Environment", "dev")
    .action(async (api, method, assertions, options) => {
        try {
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
                time: result.duration,
            });

            console.log("\nRunning tests...\n");

            let passedCount = 0;
            let failedCount = 0;

            for (const r of results) {
                if (r.passed) {
                    console.log(`✔ ${r.expression}`);
                    passedCount++;
                } else {
                    console.log(`✘ ${r.expression}`);
                    failedCount++;
                }
            }

            console.log(`\n${passedCount} passed, ${failedCount} failed\n`);

            process.exit(failedCount === 0 ? 0 : 1);
        } catch (err: any) {
            console.error("Error:", err.message);
            process.exit(1);
        }
    });


program.parse(process.argv);


if (!process.argv.slice(2).length) {
    program.outputHelp();
}

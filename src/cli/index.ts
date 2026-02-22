import { Command } from 'commander';
import { buildRequest } from '../core/requestBuilder.js';
import { executeRequest } from '../core/executor.js';
const program = new Command();

program
    .name("reqrun")
    .description("CLI tool to test api")
    .version('0.1.0');

program
    .command('run')
    .argument('<api>', 'Api endpoint name')
    .argument('<method>', 'HTTP method')
    .option('--username <username>')
    .option('--password <password>')
    .option('--env <env>', 'Environment', 'dev')
    .action(async (api, method, options) => {
        if (!api || !method) {
            console.error("API and method are required.");
            process.exit(1);
        }

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
        }
    });

program.parse();


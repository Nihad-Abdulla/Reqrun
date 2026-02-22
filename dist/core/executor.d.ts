import type { RequestConfig } from "./requestBuilder.js";
export declare function executeRequest(config: RequestConfig): Promise<{
    success: boolean;
    status: number;
    data: any;
    duration: number;
    error?: never;
} | {
    success: boolean;
    status: any;
    data: any;
    duration: number;
    error: any;
}>;
//# sourceMappingURL=executor.d.ts.map
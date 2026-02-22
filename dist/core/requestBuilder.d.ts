export interface RequestConfig {
    url: string;
    method: string;
    headers: Record<string, string>;
    data?: any;
}
export declare function buildRequest(api: string, method: string, options: any): RequestConfig;
//# sourceMappingURL=requestBuilder.d.ts.map
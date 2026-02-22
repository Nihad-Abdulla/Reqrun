import axios from "axios";
import type { RequestConfig } from "./requestBuilder.js";


export async function executeRequest(config: RequestConfig) {

    try {
        const start = Date.now();
        const response = await axios({
            url: config.url,
            method: config.method as any,
            headers: config.headers,
            data: config.data
        });
        const duration = Date.now() - start;
        return {
            success: true,
            status: response.status,
            data: response.data,
            duration

        }
    } catch (error: any) {
        return {
            success: false,
            status: error.response?.status,
            data: error.response?.data,
            error: error.message
        };
    }
}
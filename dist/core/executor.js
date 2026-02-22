import axios from "axios";
export async function executeRequest(config) {
    const start = Date.now();
    try {
        const response = await axios({
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data
        });
        const duration = Date.now() - start;
        return {
            success: true,
            status: response.status,
            data: response.data,
            duration
        };
    }
    catch (error) {
        const duration = Date.now() - start;
        return {
            success: false,
            status: error.response?.status,
            data: error.response?.data,
            duration,
            error: error.message
        };
    }
}
//# sourceMappingURL=executor.js.map
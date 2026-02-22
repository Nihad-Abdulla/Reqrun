
export interface RequestConfig {
    url: string;
    method: string;
    headers: Record<string, string>;
    data?: any;
}

export function buildRequest(
    api: string,
    method: string,
    options: any
): RequestConfig {
    const baseUrl = "https://jsonplaceholder.typicode.com"; // temp test API

    const url = `${baseUrl}/${api}`

    const headers = {
        "Content-Type": "application/json"
    }

    const data = { username: options.username, password: options.password };
    return {
        url,
        method,
        headers,
        data
    };
}
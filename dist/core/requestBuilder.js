export function buildRequest(api, method, options) {
    const baseUrl = "https://jsonplaceholder.typicode.com"; // temp test API
    const url = `${baseUrl}/${api}`;
    const headers = {
        "Content-Type": "application/json"
    };
    const data = { username: options.username, password: options.password };
    return {
        url,
        method,
        headers,
        data
    };
}
//# sourceMappingURL=requestBuilder.js.map
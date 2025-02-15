import { fetchUtils } from 'react-admin';

const httpClient = fetchUtils.fetchJson;

const dataProvider = {
    getList: async (resource) => {
        console.log(`Fetching data for resource: ${resource}`);
        try {
            const { json } = await httpClient(`/data/${resource}.json`);
            console.log("Fetched data:", json);
            return {
                data: json,
                total: json.length,
            };
        } catch (error) {
            console.error("Data fetching error:", error);
            throw new Error("Failed to load data");
        }
    }
};

export default dataProvider;
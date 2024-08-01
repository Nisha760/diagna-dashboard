import { getMethod } from "@/src/common/utils/api";
import { config } from "@/src/config";
import { formatStayDetails } from "../serializers/formatStayDetails";


export const getAllStays = async ({
    page = 1,
    limit = 10
}) => {
    const url = `${config.icuApiHost}/mimic/api/misc/allStays`;
    const params = {
        page_number: page,
        num_entries: limit,
    }
    const {response, error} = await getMethod(url, params);

    if(Array.isArray(response?.data)) { 
        const serializedData = response.data.map((el: any) => formatStayDetails(el));
        return {
            response: serializedData
        }
    } else {
        return { error: error || "Something went wrong!" }
    }
}
import { getMethod } from "@/src/common/utils/api";
import { config } from "@/src/config"
import { formatStayDetails } from "../serializers/formatStayDetails";


export const getStayDetailsById = async ({
    stayId
}: {stayId: number}) => {
    const url = `${config.icuApiHost}/mimic/api/misc/stayDetails`;

    const params = {
        stay_id: stayId
    }

    const {response, error} = await getMethod(url, params);

    if(Array.isArray(response?.data)) {
        const serializedData = response.data.length ? formatStayDetails(response.data[0]) : null
        return {response: serializedData}
    } else {
        return { error: error || "Something went wrong!" }
    }
}
import { getMethod } from "@/src/common/utils/api";
import { config } from "@/src/config"
import dayjs from "dayjs";


type GetDateRangeParams = {
    stayId: number;
    tableName: string;
}

export const getDateRange = async ({
    stayId,
    tableName
}: GetDateRangeParams) => {
    const url = `${config.icuApiHost}/mimic/api/misc/getDateRange/`;
    const params = {
        stay_id: stayId,
        table_name: tableName
    };

    const {response, error} = await getMethod(url, params);
    if(response?.data) {
        return {
            response: {
                startTime: dayjs(response.data.start_time).format('YYYY-MM-DD'),
                endTime: dayjs(response.data.end_time).format('YYYY-MM-DD')
            }
        }
    } else {
        return {error}
    }
}
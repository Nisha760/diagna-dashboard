import { getMethod } from "@/src/common/utils/api";
import { config } from "@/src/config";
import { formatRecordDetails } from "../serializers/formatLabRecordsDetails";
import { RecordColumnHeaders } from "../constants";



type LabsDataParams = {
    stayId: number;
    date: string;
}

export const getLabsData = async ({
    stayId,
    date
}: LabsDataParams) => {
    const url = `${config.icuApiHost}/mimic/api/labs/`;
    const params = {
        stay_id: stayId,
        date
    }

    const {response, error} = await getMethod(url, params);

    if(response) { 
        const serializedData = Array.isArray(response?.data) ? response.data.map((el: any) => formatRecordDetails(el)) : [];
        return {
            response: {
                data: serializedData,
                columnHeader: RecordColumnHeaders
            }
        }
    } else {
        return {error}
    }
}
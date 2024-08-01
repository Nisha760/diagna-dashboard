import { getMethod } from "@/src/common/utils/api";
import { config } from "@/src/config";
import { NeurologyRecordItem } from "../types/Records";
import { NeurologyRecordColumnHeaders } from "../constants";
import { formatRecordDetails } from "../serializers/formatLabRecordsDetails";



type NeurologyDataParams = {
    stayId: number;
    type?: string | null;
    date: string;
}


export const formatNeourologyRecordDetails = (data: any): NeurologyRecordItem => ({
    ...formatRecordDetails(data),
    type: data.type ?? 'N/A'
})


export const getNeurologyData = async ({
    stayId,
    type = null,
    date
}: NeurologyDataParams) => {
    const url = `${config.icuApiHost}/mimic/api/neurology`;
    const params = {
        stay_id: stayId,
        type,
        date,
    }

    const {response, error} = await getMethod(url, params);

    if(response) { 
        const serializedData = Array.isArray(response?.data) ? response.data.map((el: any) => formatNeourologyRecordDetails(el)) : [];
        return {
            response: {
                data: serializedData,
                columnHeader: NeurologyRecordColumnHeaders
            }
        }
    } else {
        return {error}
    }
}
import { getMethod } from "@/src/common/utils/api";
import { config } from "@/src/config";
import { VentilationRecordItem } from "../types/Records";
import { formatRecordDetails } from "../serializers/formatLabRecordsDetails";
import { VentilationRecordColumnHeaders } from "../constants";


type VentilationDataParams = {
    stayId: number;
    type: string | null;
    date: string;
}



export const formatVentilationRecordDetails = (data: any): VentilationRecordItem => ({
    ...formatRecordDetails(data),
    paramType: data.param_type ?? 'N/A',
    paramCategory: data.param_category ?? 'N/A',
})

export const getVentilationData = async ({
    type = null,
    date,
    stayId
}: VentilationDataParams) => {
    const url = `${config.icuApiHost}/mimic/api/ventilation/`;

    const params = {
        stay_id: stayId,
        type,
        date,
    }

    const {response, error} = await getMethod(url, params);

    if(response) { 
        const serializedData = Array.isArray(response?.data) ? response.data.map((el: any) => formatVentilationRecordDetails(el)) : [];
        return {
            response: {
                data: serializedData,
                columnHeader: VentilationRecordColumnHeaders
            }
        }
    } else {
        return { error: error || "Something went wrong!" }
    }
}
import dayjs from "dayjs";
import { RecordItem } from "../types/Records";


export const formatRecordDetails = (data: any): RecordItem => ({
    index: data.index ?? 'N/A',
    subjectId: data.subject_id,
    stayId: data.stay_id,
    chartTime: data.charttime ? dayjs(data.charttime).format("ha, DD MMM, YYYY") : 'N/A',
    value: data.value ?? 'N/A',
    valuenum: data.valuenum ?? 'N/A',
    valueuom: data.valueuom ?? 'N/A',
    label: data.label ?? 'N/A',
})
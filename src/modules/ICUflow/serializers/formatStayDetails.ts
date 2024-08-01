import dayjs from "dayjs";
import { StayItem } from "../types/Stays";


export const formatStayDetails = (data: any): StayItem => ({
    subjectId: data.subject_id,
    hadmId: data.hadm_id,
    stayId: data.stay_id,
    firstCareUnit: data.first_careunit ?? 'N/A',
    lastCareUnit: data.last_careunit ?? 'N/A',
    inTime: data.intime ? dayjs(data.intime).format("ha, DD MMM, YYYY") : 'N/A',
    outTime: data.outtime ? dayjs(data.outtime).format("ha, DD MMM, YYYY") : 'N/A',
    los: data.los ?? 'N/A'
})
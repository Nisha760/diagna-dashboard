
export type RecordItem = {
    index: number;
    subjectId: number;
    stayId: number;
    chartTime: string;
    value: string;
    valuenum: string;
    valueuom: string;
    label: string;
}

export type NeurologyRecordItem = RecordItem & {
    type: string;
}

export type VentilationRecordItem = RecordItem & {
    paramType: string;
    paramCategory: string;
}
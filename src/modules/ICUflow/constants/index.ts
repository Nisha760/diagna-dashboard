

export const StayDetailsColumnHeader = [
    {
        key: "stayId",
        title: "Stay Id",
    },
    {
        key: "subjectId",
        title: "Subject Id",
    },
    {
        key: "hadmId",
        title: "Hadm Id ",
    },
    {
        key: "firstCareUnit",
        title: "First Care Unit",
    },
    {
        key: "lastCareUnit",
        title: "Last Care Unit",
    },
    {
        key: "inTime",
        title: "In Time",
    },
    {
        key: "outTime",
        title: "Out Time",
    },
    {
        key: "los",
        title: "los",
    },
]



export const RecordColumnHeaders = [
    {
        key: "stayId",
        title: "Stay Id",
    },
    {
        key: "index",
        title: "Index",
    },
    {
        key: "subjectId",
        title: "Subject Id",
    },
    {
        key: "chartTime",
        title: "Chart Time",
    },
    {
        key: "value",
        title: "Value",
    },
    {
        key: "valuenum",
        title: "valuenum",
    },
    {
        key: "valueuom",
        title: "valueuom",
    },
    {
        key: "label",
        title: "Label",
    },
]


export const NeurologyRecordColumnHeaders = [
    ...RecordColumnHeaders,
    {
        key: "type",
        title: "Title"
    }
]

export const VentilationRecordColumnHeaders = [
    ...RecordColumnHeaders,
    {
        key: "paramType",
        title: "Param Type"
    },
    {
        key: "paramCategory",
        title: "Param Category"
    },
];


export const RecordTypes = [
    "labs",
    "neurology",
    "ventilation"
]

export enum RecordsType {
    Labs = "labs",
    Neurology = "neurology",
    Ventilation = "ventilation"
}

export enum SideBarState {
    Expanded = "expanded",
    Collapsed = "collapsed"
}
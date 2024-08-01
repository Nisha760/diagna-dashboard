import { Option } from "../types"

export const DefaultSelectedType =  {
    value: null,
    label: "All"
}

export const VentilationTypes: Option[] = [
    DefaultSelectedType,
    {
        value: "observation",
        label: "Observation",
    }
]

export const NeurologyTypes: Option[] = [
    DefaultSelectedType
,
    {
        value: "GCS",
        label: "GCS"
    },
    {
        value: "Pupil",
        label: "Pupil"
    }
]
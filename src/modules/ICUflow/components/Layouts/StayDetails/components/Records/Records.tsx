import { useEffect, useMemo, useState } from "react"

import SelectDropdown from "@/src/common/components/SelectDropdown";
import Table from "@/src/common/components/Table";
import { RecordsType } from "@/src/modules/ICUflow/constants"
import { DefaultSelectedType, NeurologyTypes, VentilationTypes } from "@/src/modules/ICUflow/constants/recordFilters";
import { getLabsData } from "@/src/modules/ICUflow/services/getLabsData";
import { getDateRange } from "@/src/modules/ICUflow/services/getDateRange";
import { getVentilationData } from "@/src/modules/ICUflow/services/getVentilationData";
import { getNeurologyData } from "@/src/modules/ICUflow/services/getNeurologyData";
import s from './Records.module.css';
import { NeurologyRecordItem, RecordItem, VentilationRecordItem } from "@/src/modules/ICUflow/types/Records";
import { ColumnHeaderItem } from "@/src/modules/ICUflow/types";


type RecordsProps = {
    tableType: RecordsType;
    stayId: number
}
type RecordDataStateType = {
    data: RecordItem[] | VentilationRecordItem[] | NeurologyRecordItem[],
    columnHeader: ColumnHeaderItem[]
}

export const Records = ({
    tableType,
    stayId
}: RecordsProps) => {

    //states
    const [records, setRecords] = useState<RecordDataStateType>({
        data: [],
        columnHeader: []
    }); // stores information for  all the records
    const [isLoading, setIsLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string | null>(DefaultSelectedType.value);  // stores the selected type from type filter
    const [selectedDate, setSelectedDate] = useState<string>(''); // stores the date selected by the user
    const [dateRange, setDateRange] = useState({
        startTime: '',
        endTime: ''
    }); // stores date range for which the data is present of a particular stay id and table


    //functions
    const fetchRecords = async ({
        sId = stayId,
        date = selectedDate,
        type = selectedType
    }) => {
        setIsLoading(true);
        let response, error;
        switch (tableType) {
            case RecordsType.Labs:
                {
                    ({ response, error } = await getLabsData({
                        stayId: sId,
                        date
                    }));
                    break;
                }
            case RecordsType.Neurology: {
                ({ response, error } = await getNeurologyData({
                    stayId: sId,
                    date,
                    type
                }));
                break;
            }
            case RecordsType.Ventilation: {
                ({ response, error } = await getVentilationData({
                    stayId: sId,
                    date,
                    type
                }));
                break;
            }
        }

        if (response) {
            setRecords(response)
        } else if (error) {
            alert(error)
        }
        setIsLoading(false);
    }


    const fetchDateRange = async () => {
        const { response, error } = await getDateRange({
            stayId,
            tableName: tableType
        });

        if (response) {
            setDateRange(response);
            setSelectedDate(response.endTime);
            return { endTime: response.endTime };
        } else if(error) {
            alert(error)
        }

        return { endTime: '' };
    }

    const fetchData = async () => {
        const { endTime } = await fetchDateRange();

        await fetchRecords({
            date: endTime
        })
    }



    //memo
    const typeFilterOptions = useMemo(() => {
        switch (tableType) {
            case RecordsType.Neurology:
                return NeurologyTypes;

            case RecordsType.Ventilation:
                return VentilationTypes;

            default:
                return []
        }
    }, [tableType])


    //effects
    useEffect(() => {
        if (tableType) {
            setSelectedType(DefaultSelectedType.value);
            fetchData();
        }
    }, [tableType])


    return (
        <>
            <div className={s.filter}>
                {
                    dateRange.endTime && dateRange.startTime &&
                    <input
                        type="date"
                        id="date-input"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            fetchRecords({
                                date: e.target.value
                            });
                        }}
                        min={dateRange.startTime}
                        max={dateRange.endTime}
                    />
                }
                {
                    !!typeFilterOptions.length &&
                    <SelectDropdown
                        options={typeFilterOptions}
                        value={selectedType}
                        onChange={(val) => {
                            setSelectedType(val);
                            fetchRecords({
                                type: val
                            });
                        }}
                        placeholder="Select Type"
                    />
                }
            </div>


            <Table
                columns={records.columnHeader}
                data={records.data}
                isLoading={isLoading}
            />
        </>
    )
}
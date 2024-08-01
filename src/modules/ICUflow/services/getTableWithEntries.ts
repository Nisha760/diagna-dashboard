import { getMethod } from "@/src/common/utils/api";
import { config } from "@/src/config"
import { RecordTypes } from "../constants";


export const getTableWithEntries = async ({
    stayId
}: { stayId: number }) => {
    const url = `${config.icuApiHost}/mimic/api/misc/getTablesWithEntries`;
    const params = {
        stay_id: stayId
    }

    const { response, error } = await getMethod(url, params);

    if (Array.isArray(response?.data)) {
        const recordsWithEntries = response?.data.reduce((acc: { key: string; title: string }[], curr: string) => {
            if (RecordTypes.includes(curr))
                acc.push({
                    key: curr,
                    title: curr.replaceAll("_", " ")
                });
            return acc;
        }, [])

        return { response: recordsWithEntries }
    } else {
        return { error: error || "Something went wrong!" }
    }
}
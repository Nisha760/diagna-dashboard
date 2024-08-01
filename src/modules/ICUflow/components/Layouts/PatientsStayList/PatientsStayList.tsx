import { useEffect, useState } from 'react';

import s from './PatientStayList.module.css';
import { getAllStays } from '../../../services/getAllStays';
import Table from '@/src/common/components/Table';
import { StayDetailsColumnHeader } from '../../../constants';
import { useRouter } from 'next/router';
import Pagination from '@/src/common/components/Pagination';


/*
    *displays the patient stay information. 
    *One row in table is responsible for rendering data with respect to a particular stay id.
*/


export const PatientStayList = () => {
    //hooks
    const router = useRouter();

    //states
    const [stayList, setStayList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);


    //functions
    const fetchStayList = async () => {
        setIsLoading(true);
        const { response, error } = await getAllStays({
            page,
        });

        if (response) {
            setStayList(response);
        } else if(error) {
            alert(error)
        }
        setIsLoading(false);
    }

    //effects
    useEffect(() => {
        fetchStayList();
    }, [page])

    return (
        <div className={s.root}>
            <Table
                columns={StayDetailsColumnHeader}
                data={stayList}
                onClickActionBtn={(rowData) => {
                    router.push({
                        pathname: '/stay-details',
                        query: {
                            stay_id: rowData?.stayId
                        }
                    })
                }}
                withActionBtn
                actionBtnTitle='View Details'
                isLoading={isLoading}
            />

            <Pagination
                activePage={page}
                onPageChange={(val) => {
                   setPage(val) 
                }}
                isNextDisabled = {false}
            />

        </div>
    )
}
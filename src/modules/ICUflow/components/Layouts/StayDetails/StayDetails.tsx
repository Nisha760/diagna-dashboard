import { useEffect, useMemo, useState } from 'react';
import { BsClipboardData } from "react-icons/bs";
import { useRouter } from 'next/router';

import styles from './StayDetails.module.css';
import { getStayDetailsById } from '../../../services/getStayDetailsById';
import { RecordsType, SideBarState, StayDetailsColumnHeader } from '../../../constants';
import SideBar from '@/src/common/components/SideBar';
import { getTableWithEntries } from '../../../services/getTableWithEntries';
import SidebarItem from './components/SideBarItem';
import Records from './components/Records';
import Modal from '@/src/common/components/Modal';
import { RowItem } from '../../../types';



export const StayDetails = () => {
    //hooks
    const router = useRouter();

    //states
    const [stayDetails, setStayDetails] = useState<RowItem>();
    const [showStayDetails, setShowStayDetails] = useState(false);


    //functions
    const fetchStayDetails = async () => {
        const { response, error } = await getStayDetailsById({
            stayId: Number(router.query.stay_id)
        });

        if (response) {
            setStayDetails(response)
        } else if (error) {
            alert(error)
        }
    }

    //effects

    useEffect(() => {
        if (router.isReady) {
            fetchStayDetails()
        }
    }, [router.isReady])

    if (stayDetails)
        return (
            <div>
                <button
                  className={styles.show_stay_details_btn}
                  onClick={() => setShowStayDetails(true)}
              >
                  View Stay Details
              </button>

                <div>
                    <Records
                        tableType={router.query.record_type as RecordsType}
                        stayId={Number(router.query.stay_id) as number}
                    />
                </div>

                <Modal
                    isOpen={showStayDetails}
                    onClose={() => setShowStayDetails(false)}
                >
                <div className={styles.stay_card}>
                    <h2>Stay Details</h2>
                    <div className={styles.stay_card_content}>
                        {

                            StayDetailsColumnHeader.map(el => (
                                <div key={el.key} className={styles.stay_card_item}>
                                    <span className={styles.stay_card_label}>{el.title}: </span>
                                    <span className={styles.stay_card_value}>{stayDetails[el.key]}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                </Modal>
            </div>
        )
}

export const StayDetailsWithSideBar = () => {
    //hooks
    const router = useRouter();

    //states
    const [recordsTypeList, setRecordTypeList] = useState<{ key: string; title: string; }[]>([]);
    const [sidebarState, setSidebarState] = useState<SideBarState>();


    //functions
    const fetchRecordTypeWithData = async () => {
        const { response, error } = await getTableWithEntries({
            stayId: Number(router.query.stay_id)
        });

        if (response) {
            setRecordTypeList(response);
            if(!router.query.record_type) {
                router.replace({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        record_type: "neurology"
                    }
                },
                    undefined,
                    { shallow: true }
                )
            }
        } else if (error) {
            alert(error);
        }
    }


    //memo
    const sideBarContent = useMemo(() => {
        if (recordsTypeList.length) {
            return (
                recordsTypeList.map(el => (
                    <>
                    <SidebarItem
                        key={el.key}
                        title={el.title}
                        icon={<BsClipboardData />}
                        onClick={() => {
                            router.replace({
                                pathname: router.pathname,
                                query: {
                                    ...router.query,
                                    record_type: el.key
                                }
                            })
                        }}
                        isCollpased={sidebarState === SideBarState.Collapsed}
                        isActive={el.key === router.query.record_type}
                    />
                    </>
                ))
            )
        }
    }, [recordsTypeList, sidebarState, router.query.record_type])

//effects
    useEffect(() => {
        if (router.isReady && router.query.stay_id) {
            fetchRecordTypeWithData();
        }
    }, [router.isReady])

    return (
        <SideBar
            SideBarContent={sideBarContent}
            onChangeState={(state) => {
                setSidebarState(state);
            }}
        >
            <StayDetails/>
        </SideBar>
    )
}
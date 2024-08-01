import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

import styles from './SideBar.module.css';
import { SideBarState } from '@/src/modules/ICUflow/constants';



export const SideBar = ({ children, SideBarContent, onChangeState }: {children: ReactNode; SideBarContent: ReactNode; onChangeState: (state: SideBarState) => void;}) => {

    //states
    const [currentToggleState, setCurrentToggleState] = useState(SideBarState.Expanded)


    //functions
    const handleToggle = () => {
        setCurrentToggleState(prev => prev === SideBarState.Collapsed ? SideBarState.Expanded : SideBarState.Collapsed);
    }



    //effects
    useEffect(() => {
        onChangeState(currentToggleState)
    }, [currentToggleState])

    return (
        <div className={styles.root_wrapper}>
            <div className={classNames(styles.side_bar, {
                [styles.collapsed]: currentToggleState === SideBarState.Collapsed,
                [styles.expanded]: currentToggleState === SideBarState.Expanded
            })}>
                <div className={styles.option_list}>
                    {SideBarContent}
                </div>

                <div onClick={handleToggle} className={classNames(styles.toggle_btn, {
                    [styles.collapsed]: currentToggleState === SideBarState.Collapsed,
                    [styles.expanded]: currentToggleState === SideBarState.Expanded
                })}>
                    {
                        currentToggleState === SideBarState.Collapsed
                        ? <FaArrowRightLong />
                        : <FaArrowLeftLong />
                    }
                </div>
            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}
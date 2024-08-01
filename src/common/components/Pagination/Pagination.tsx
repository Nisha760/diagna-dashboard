
import s from './Pagination.module.css';



type PaginationProps = {
    activePage: number;
    onPageChange: (activePage: number) => void;
    isNextDisabled: boolean
} 

export const Pagination = ({
    activePage,
    onPageChange,
    isNextDisabled
}: PaginationProps) => {

    return (
        <div className={s.root}>
            <div onClick={() => {
                if(activePage > 1)
                    onPageChange(activePage -1);
            }} className={s.prev}>
                prev
            </div>

            <div>
                {activePage}
            </div>

            <div onClick={() => {
                if(!isNextDisabled){
                    onPageChange(activePage + 1);
                }
            }} className={s.next}>
                next
            </div>
        </div>
    )
}
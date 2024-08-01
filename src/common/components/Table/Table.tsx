
import React from 'react';

import s from './Table.module.css';
import { ColumnHeaderItem, RowItem } from '@/src/modules/ICUflow/types';


type TableProps = {
  data: RowItem[];
  columns: ColumnHeaderItem[];
  onClickActionBtn?: (rowData: any) => void;
  withActionBtn?: boolean;
  actionBtnTitle?: string;
  isLoading?: boolean
}


/*
  this component is responsible for rendering table and accepts data 
  and column headers from parent in a specified way.
*/

export const Table = ({
  data = [],
  columns = [],
  onClickActionBtn = () => { },
  withActionBtn = false,
  actionBtnTitle = '',
  isLoading = false
}: TableProps) => {


  // loading state when the data is being fetched. COntrolled from the parent component.
  if(isLoading)
  return (
    <div className={s.loader_wrapper}>
      {
        Array.from({length: 10}).map((el, index) => (
          <div key={index} className={s.table_shimmer_box}></div>
        ))
      }
    </div>
    )
  
  return (
    <div className={s.table_container}>
      {
        !!data.length
          ? <table className={s.styled_table}>
            <thead>
              <tr>
                {
                  columns.map(columnHeader => (
                    <th key={columnHeader.key}>
                      {columnHeader.title}
                    </th>
                  ))
                }
                {withActionBtn && <th />}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {
                    columns.map(columnHeader => (
                      <td key={columnHeader.key}>
                        {row[columnHeader.key] || "--"}
                      </td>
                    ))
                  }
                  {
                    withActionBtn &&
                    <td>{<button
                      className={s.table_button}
                      onClick={() => onClickActionBtn(row)}
                    >
                      {actionBtnTitle}
                    </button>}</td>
                  }
                </tr>
              ))}
            </tbody>


          </table>
          : <div className={s.no_entries}>No Entries</div>
      }

    </div>
  );
};

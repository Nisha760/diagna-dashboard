import React from 'react';

import s from './Table.module.css';

interface Columns {
  key: string;
  title: string;
}

interface RowItem {
  [key: string]: any;
}


interface TableProps {
  data: RowItem[];
  columns: Columns[];
  onClickActionBtn?: (rowData: any) => void;
  withActionBtn?: boolean;
  actionBtnTitle?: string;
  isLoading?: boolean
}

export const Table = ({
  data = [],
  columns = [],
  onClickActionBtn = () => { },
  withActionBtn = false,
  actionBtnTitle = '',
  isLoading = false
}: TableProps) => {


  if(isLoading)
  return (
    <div className={s.loader_wrapper}>
      {
        Array.from({length: 10}).map(el => (
          <div className={s.table_shimmer_box}></div>
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

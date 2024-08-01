import React from 'react';
import classNames from 'classnames';

import s from './SidebarItem.module.css'; 



type SidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  isCollpased?: boolean;
  isActive: boolean;
}

export const SidebarItem = ({ icon, title, onClick, isCollpased, isActive }: SidebarItemProps) => {

  return (
    <div className={classNames(s.sidebarItem, {
      [s.active]: isActive
    })} onClick={onClick}>
      <span className={s.icon}>{icon}</span>
      <span className={classNames(s.title, {
        [s.is_collapsed]: isCollpased
      })}>{title}</span>
    </div>
  );
};

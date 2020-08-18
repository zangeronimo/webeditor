import React, { useState } from 'react';

import './styles.css';
import { MdExpandMore, MdKeyboardArrowRight } from 'react-icons/md';

interface MenuItemProps {
    title?: string;
    id?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, id, children }) => {
    const [subitem, setSubitem] = useState<number>(0);

    function toggleSubmenu(key: number) {
        if (checkSubitem(key)) {
            setSubitem(0);
        } else {
            setSubitem(key);
        }
    }

    function checkSubitem(key: number) {
        return subitem === key;
    }

    if (id) {
        return (
            <section className="sidebar_block">
                <section className="subitem_title" onClick={() => toggleSubmenu(id)}>
                    {checkSubitem(id) ? <MdExpandMore className="icon" /> : <MdKeyboardArrowRight className="icon" />}
                    {title}
                </section>
                {checkSubitem(id) && (
                    <section className="sidebar_subitem">
                        {children}
                    </section>
                )}
            </section>
        );
    }

    return (
        <section className="sidebar_block">
            {children}
        </section>
    );
}

export default MenuItem;
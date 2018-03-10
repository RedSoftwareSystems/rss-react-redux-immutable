import React from 'react';
import { NavLink } from 'react-router-dom';
import pages from 'app/components/pages';

const TopMenu = () => (<ul>
    {Object.entries(pages).map(([path, props]) => (
        <li key={path}>
            <NavLink to={path}>{props.navTitle}</NavLink>
        </li>))}
</ul>);

export default TopMenu;
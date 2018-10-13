import React from 'react';

// assets
import classes from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';

// components
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle clicked={props.toggled} />
	
			<div className={classes.Logo}>
				<Logo />
			</div>
	
	
			<nav className={classes.DesktopOnly}>
				<NavigationItems />
			</nav>
		</header>
	);
} 

export default toolbar;
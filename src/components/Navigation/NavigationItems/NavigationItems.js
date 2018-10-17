import React from 'react';

// assets
import classes from './NavigationItems.module.css'

// components
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem 
			link="/"
			exact>
			Burger Builder
		</NavigationItem>

		<NavigationItem link="/orders">
			Orders
		</NavigationItem>
	</ul>
);

export default navigationItems
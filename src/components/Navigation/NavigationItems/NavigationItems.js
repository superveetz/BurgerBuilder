import React from 'react';

// assets
import classes from './NavigationItems.module.css'

// components
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem 
			link="/"
			active>
			Burger Builder
		</NavigationItem>

		<NavigationItem link="/">
			Checkout
		</NavigationItem>
	</ul>
);

export default navigationItems
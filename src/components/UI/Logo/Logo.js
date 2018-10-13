import React from 'react';

// assets
import classes from './Logo.module.css';
import burgerLogo from '../../../assets/burger-logo.png';

const logo = (props) => (
	<div className={classes.Logo}>
		<img src={burgerLogo} alt="Burger Logo" />
	</div>
);

export default logo;
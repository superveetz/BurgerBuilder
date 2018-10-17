import React from 'react';
// import { withRouter } from'react-router-dom';
// css
import classes from './Burger.module.css';

// components
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	let transformedIngredients = [];

	for (let prop in props.ingredients) {
		 const numIngredient = props.ingredients[prop];
		 for(let i = 0; i < numIngredient; i++) {
			transformedIngredients.push(<BurgerIngredient key={prop + i} type={prop} />)
		 }
	}

	 // for each ingredient, transform into an array with of length quantity for each <BurgerIngredient>
	// let transformedIngredients = Object.keys(props.ingredients)
	// 	.map(igKey => {
	// 		return [...Array(props.ingredients[igKey])].map((_, i) => {
	// 			return <BurgerIngredient key={igKey + i} type={igKey} />
	// 		});
	// 	})
	// 	.reduce((arr, el) => {
	// 		console.log("arr:", arr);
			
	// 		return arr.concat(el);
	// 	}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
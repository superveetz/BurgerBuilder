import React from 'react';

//css
import classes from './BuildControls.module.css';

// components
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>Current Price: $<strong>{props.totalPrice.toFixed(2)}</strong></p>
		{ controls.map(ctrl => {
			return <BuildControl 
						key={ctrl.label} 
						label={ctrl.label} 
						added={() => props.ingredientAdded(ctrl.type)} 
						removed={() => props.ingredientRemoved(ctrl.type)} 
						disabled={props.disabledInfo[ctrl.type]} />
		})}

		<button 
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}>
			ORDER NOW
		</button>
	</div>
);

export default buildControls;
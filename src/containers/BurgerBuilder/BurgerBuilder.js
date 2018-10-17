import React, { Component } from 'react';

// configs
import axios from '../../axios-orders';

// components
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuidlControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount () {
		axios.get('/ingredients.json')
			.then(res => {
				this.setState({ ingredients: res.data });
			})
			.catch(err => {
				this.setState({ error: err });
			});
	}

	updatePurchaseable (ingredients) {

		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

			console.log("sum:", sum);
			

		this.setState((prevState, _) => {
			return {
				purchasable: sum > 0
			};
		});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};

		// update count
		updatedIngredients[type] = updatedCount;

		// update price
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState((prevState, _) => {
			return {
				totalPrice: newPrice,
				ingredients: updatedIngredients
			}
		});

		this.updatePurchaseable(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		// exit if already at 0
		if (oldCount <= 0) return;

		const updatedCount = oldCount - 1;

		const updatedIngredients = {
			...this.state.ingredients
		};

		// update count
		updatedIngredients[type] = updatedCount;

		// update price
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceAddition;
		this.setState((prevState, _) => {
			return {
				totalPrice: newPrice,
				ingredients: updatedIngredients
			}
		});

		this.updatePurchaseable(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// create our query string and URI encode it
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); // encode each
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
		let orderSummary = null;

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls 
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler} 
						disabledInfo={disabledInfo} 
						purchasable={this.state.purchasable}
						totalPrice={this.state.totalPrice}
						ordered={this.purchaseHandler} />
				</Aux>
			);

			orderSummary = <OrderSummary 
								price={this.state.totalPrice}
								ingredients={this.state.ingredients} 
								purchaseCancelled={this.purchaseCancelHandler} 
								purchaseContinued={this.purchaseContinueHandler} />;
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
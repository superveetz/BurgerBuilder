import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount () {
		this.props.onInitIngredients();
	}

	updatePurchaseable (ingredients) {

		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
			
			return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
		
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// create our query string and URI encode it
		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); // encode each
		// }
		// queryParams.push('price=' + this.props.price);
		// const queryString = queryParams.join('&');
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		
		let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
		let orderSummary = null;

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls 
						isAuth={this.props.isAuthenticated}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved} 
						disabledInfo={disabledInfo} 
						purchasable={this.updatePurchaseable(this.props.ings)}
						totalPrice={this.props.price}
						ordered={this.purchaseHandler} />
				</Aux>
			);

			orderSummary = <OrderSummary 
								ingredients={this.props.ings} 
								price={this.props.price}
								purchaseCancelled={this.purchaseCancelHandler} 
								purchaseContinued={this.purchaseContinueHandler} />;
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

const mapStateToProps =  state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
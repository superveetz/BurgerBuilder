import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

	componentWillMount () {
		// console.log("this.props:", this.props);
		
		// const query = new URLSearchParams(this.props.location.search);
		// const ingredients = {};
		// let price = 0;
		// for (let param of query.entries()) {
		// 	console.log("param:", param);
		// 	if (param[0] === "price") {
		// 		price = param[1];
		// 	} else {
		// 		ingredients[param[0]] = param[1]; // convert query string into object
		// 	}
		// }

		// console.log("ingredients:", ingredients);
		

		// console.log("query:", query);
		

		// this.setState({ ingredients: ingredients, totalPrice: price });	
	};

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render () {
		let summary = <Redirect to="/" />
		
		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

			summary = (
				<div>
					{purchasedRedirect}

					<CheckoutSummary 
						ingredients={this.props.ings} 
						checkoutCancelled={this.checkoutCancelledHandler} 
						checkoutContinued={this.checkoutContinuedHandler} />
					<Route 
						path={this.props.match.path + '/contact-data'} 
						component={ContactData} />
				</div>
				);
		}

		return summary;
	}
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
};


export default connect(mapStateToProps)(Checkout);
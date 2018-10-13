import React, { Component }  from 'react';

// assets
import classes from './Layout.module.css';

// other components
import Aux from '../Auxillary/Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return {
				showSideDrawer: !prevState.showSideDrawer
			};
		});
	};

	render () {
		return (
			<Aux>
				<Toolbar 
					opened={this.sideDrawerOpenedHandler}
					toggled={this.sideDrawerToggleHandler} />

				<SideDrawer 
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}  />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
};

export default Layout;
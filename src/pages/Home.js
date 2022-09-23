import React, { useEffect } from 'react';
//Components
import { Hero, Card, CardGrid } from '../components';

// State
import { state } from '../state';
import { useSnapshot } from 'valtio';

const Home = () => {
	const snap = useSnapshot(state);

	const getUsers = async () => {
		const users = await (await fetch('http://localhost:3000/user')).json();
		state.users = users.body;
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<Hero title="WELCOME TO MY MESSAGE APP" subtitle="USERS:">
			<CardGrid>
				{snap.users.length &&
					snap.users.map((user) => {
						return (
							<Card
								key={user._id}
								id={user._id}
								title={user.name}
								email={user.email}
								button="Select User"
								route="user"
							/>
						);
					})}
			</CardGrid>
		</Hero>
	);
};

export default Home;

/* eslint-disable @typescript-eslint/restrict-template-expressions */
import HomePage from './app/components/homepage/Homepage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanPage from './app/components/scanPage/ScanPage';
import RemovePage from './app/components/removePage/RemovePage';
import AddPage from './app/components/addPage/AddPage';
import CommonProductDetailPage from './app/components/commonProductDetailPage/commonProductDetailPage';
import ScanBeforeRemove from './app/components/removePage/ScanBeforeRemove';
import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {HELLO_WORLD} from './app/graphql/query/helloWorld';

const Stack = createNativeStackNavigator();

const App = (): React.ReactElement => {

	const client = new ApolloClient({
		uri: 'https://e196-185-244-237-236.eu.ngrok.io/graphql',
		cache: new InMemoryCache({
			addTypename: false
		})
	});

	client
  .query({
    query: HELLO_WORLD
  })
  .then((result): void => {console.log(result);});

	return (
		<ApolloProvider client={client}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
					<Stack.Screen name="Home" component={HomePage}/>
					<Stack.Screen name="Scan" component={ScanPage} />
					<Stack.Screen name="Remove" component={RemovePage} />
					<Stack.Screen name="CommonProductDetail" component={CommonProductDetailPage} />
					<Stack.Screen name="Add" component={AddPage} />
					<Stack.Screen name="RemoveScan" component={ScanBeforeRemove} />
				</Stack.Navigator>
			</NavigationContainer>
		</ApolloProvider>
	);
};


export default App;



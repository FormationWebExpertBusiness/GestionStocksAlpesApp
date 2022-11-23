import HomePage from './components/homepage/Homepage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanPage from './components/scanPage/ScanPage';
import RemovePage from './components/removePage/RemovePage';
import AddPage from './components/addPage/AddPage';
import CommonItemDetailPage from './components/commonItemDetailPage/commonItemDetailPage';
import ScanBeforeRemove from './components/removePage/ScanBeforeRemove';
import React from 'react';

const Stack = createNativeStackNavigator();

const App = (): React.ReactElement => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
				<Stack.Screen name="Home" component={HomePage}/>
				<Stack.Screen name="Scan" component={ScanPage} />
				<Stack.Screen name="Remove" component={RemovePage} />
				<Stack.Screen name="CommonItemDetail" component={CommonItemDetailPage} />
				<Stack.Screen name="Add" component={AddPage} />
				<Stack.Screen name="RemoveScan" component={ScanBeforeRemove} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};


export default App;

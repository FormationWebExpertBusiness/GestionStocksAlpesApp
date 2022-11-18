import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	Text
} from 'react-native';
import {BLACK, CULTURED} from './style/colors';
import HomePage from './components/homepage/Homepage';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const STYLES = StyleSheet.create({
	safeAreaViewStyle: {
		backgroundColor: CULTURED,
		flex: 1
	},
	scrollViewStyle: {
		marginTop: 20,
		paddingHorizontal: 20
	},
	sectionTitle: {
		color: CULTURED,
		fontSize: 24,
		fontWeight: '600'
	},
	headerWrapper: {
		display: 'flex',
		alignItems: 'center',
		paddingHorizontal: 20,
		height: 75,
		backgroundColor: BLACK,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = (): React.ReactElement => {
	return (
		<NavigationContainer>
			<SafeAreaView style={STYLES.safeAreaViewStyle}>
				<View style={STYLES.headerWrapper}>
						<Text style={STYLES.sectionTitle}>Top tab navigator</Text>
						<Text style={STYLES.sectionTitle}>=</Text>
				</View>
				<ScrollView style={STYLES.scrollViewStyle}>
					<HomePage />
				</ScrollView>
			</SafeAreaView>
		</NavigationContainer>
	);
};


export default App;

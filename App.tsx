import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text
} from 'react-native';
import {BLACK, CULTURED} from './colors';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const STYLES = StyleSheet.create({
	safeAreaViewStyle: {
		backgroundColor: CULTURED,
		flex: 1
	},
	sectionTitle: {
		color: BLACK,
		fontSize: 24,
		fontWeight: '600'
	}

});

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = (): React.ReactElement => {
	return (
		<NavigationContainer>
			<SafeAreaView style={STYLES.safeAreaViewStyle}>
				<ScrollView>
					<Text style={STYLES.sectionTitle}>APP</Text>
				</ScrollView>
			</SafeAreaView>
		</NavigationContainer>
	);
};


export default App;

import {
	View,
	Text,
	StyleSheet,
	Pressable
} from 'react-native';
import {CULTURED, BLACK, ALMOST_WHITE} from '../style/colors';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faQrcode} from '@fortawesome/free-solid-svg-icons/faQrcode';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';


const STYLES = StyleSheet.create({
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
	},
	scan: {
		padding: 10,
		width: 80,
		left: 15,
		alignItems: 'center',
		justifyContent: 'center',
		height: 72
	},
	backWrapper: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	backButton: {
		marginRight: 20
	}
});

type CustomTopTabNavigatorProps = {
	mode: 'all' | 'back';
	onPressScan?(): void;
	onPressBack?(): void;
};

const CustomTopTabNavigator = (props: CustomTopTabNavigatorProps): React.ReactElement => {

	function renderContent(): React.ReactElement {
		if(props.mode === 'all') {
			return (
				<>
					<Text style={STYLES.sectionTitle}>Alpes Networks</Text>
					<Pressable style={STYLES.scan} onPress={(): void => { props.onPressScan?.(); }}>
						<FontAwesomeIcon color={ALMOST_WHITE} icon={faQrcode} size={30} />
					</Pressable>
				</>
			);

		} else if(props.mode === 'back') {
			return (
				<View style={STYLES.backWrapper}>
					<Pressable style={STYLES.backButton} onPress={(): void => { props.onPressBack?.(); } }>
						<FontAwesomeIcon color={ALMOST_WHITE} icon={faArrowLeft} size={30} />
					</Pressable>
					<Text style={STYLES.sectionTitle}>Alpes Networks</Text>
				</View>
			);
		}
		return <View />;
	}

	return (
		<View style={STYLES.headerWrapper}>
			{renderContent()}
		</View>
	);
};


export default CustomTopTabNavigator;

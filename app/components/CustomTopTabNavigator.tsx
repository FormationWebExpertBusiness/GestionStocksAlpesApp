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
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';


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
		alignItems: 'center',
		justifyContent: 'center',
		height: 72,
		width: 30,
		marginRight: 20
	},
	plusButton: {
		padding: 10,
		height: 72,
		width: 72,
		marginLeft: 30,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10
	},
	plusWrapper: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	plusBackground: {
		backgroundColor: '#86868644',
		height: 50,
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50
	}
});

type CustomTopTabNavigatorProps = {
	mode: 'all' | 'back' | 'plus';
	onPressScan?(): void;
	onPressBack?(): void;
	onPressPlus?(): void;
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
		} else if(props.mode === 'plus') {
			return (
				<View style={STYLES.plusWrapper}>
					<View style={STYLES.backWrapper}>
						<Pressable style={STYLES.backButton} onPress={(): void => { props.onPressBack?.(); } }>
							<FontAwesomeIcon color={ALMOST_WHITE} icon={faArrowLeft} size={30} />
						</Pressable>
						<Text style={STYLES.sectionTitle}>Alpes Networks</Text>
					</View>
					<Pressable style={STYLES.plusButton} onPress={(): void => { props.onPressPlus?.(); } }>
						<View style={STYLES.plusBackground}>
							<FontAwesomeIcon color={ALMOST_WHITE} icon={faPlus} size={30} />
						</View>
					</Pressable>
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

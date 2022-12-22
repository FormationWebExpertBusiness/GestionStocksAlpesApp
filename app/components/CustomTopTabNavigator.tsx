import {
	View,
	Text,
	StyleSheet,
	Pressable
} from 'react-native';
import {CULTURED, BLACK, ALMOST_WHITE, TOPNAVIGATORBUTTONBG, AVERAGE_GREY} from '../style/colors';
import type {ReactElement} from 'react';
import React, {useState} from 'react';
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
	buttonBackground: {
		backgroundColor: TOPNAVIGATORBUTTONBG,
		height: 55,
		width: 55,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50
	},
	backPlusBackground: {
		height: 50,
		width: 50
	},
	qrCodeBackground: {
		height: 55,
		width: 55
	}
});

type CustomTopTabNavigatorProps = {
	mode: 'all' | 'back' | 'plus';
	onPressScan?(): void;
	onPressBack?(): void;
	onPressPlus?(): void;
};

const CustomTopTabNavigator = (props: CustomTopTabNavigatorProps): ReactElement => {

	const [qrCodeIconColor, setQrCodeIconColor] = useState<string>(ALMOST_WHITE);
	const [backIconColor, setBackIconColor] = useState<string>(ALMOST_WHITE);
	const [plusIconColor, setPlusIconColor] = useState<string>(ALMOST_WHITE);

	function renderContent(): ReactElement {
		if(props.mode === 'all') {
			return (
				<>
					<Text style={STYLES.sectionTitle}>Alpes Networks</Text>
					<Pressable
						style={STYLES.scan}
						onPress={(): void => { props.onPressScan?.(); }}
						onPressIn={(): void => { setQrCodeIconColor(AVERAGE_GREY); }}
						onPressOut={(): void => { setQrCodeIconColor(ALMOST_WHITE); }}
					>
						<View style={[STYLES.buttonBackground, STYLES.qrCodeBackground]}>
							<FontAwesomeIcon color={qrCodeIconColor} icon={faQrcode} size={30} />
						</View>
					</Pressable>
				</>
			);

		} else if(props.mode === 'back') {
			return (
				<View style={STYLES.backWrapper}>
					<Pressable
						style={STYLES.backButton}
						onPress={(): void => { props.onPressBack?.(); }}
						onPressIn={(): void => { setBackIconColor(AVERAGE_GREY); }}
						onPressOut={(): void => { setBackIconColor(ALMOST_WHITE); }}
					>
					<View style={[STYLES.buttonBackground, STYLES.backPlusBackground]}>
							<FontAwesomeIcon color={backIconColor} icon={faArrowLeft} size={30} />
						</View>
					</Pressable>
					<Text style={STYLES.sectionTitle}>Alpes Networks</Text>
				</View>
			);
		} else if(props.mode === 'plus') {
			return (
				<View style={STYLES.plusWrapper}>
					<View style={STYLES.backWrapper}>
						<Pressable
							style={STYLES.backButton}
							onPress={(): void => { props.onPressBack?.(); }}
							onPressIn={(): void => { setBackIconColor(AVERAGE_GREY); }}
							onPressOut={(): void => { setBackIconColor(ALMOST_WHITE); }}
						>
						<View style={[STYLES.buttonBackground, STYLES.backPlusBackground]}>
								<FontAwesomeIcon color={backIconColor} icon={faArrowLeft} size={30} />
							</View>
						</Pressable>
						<Text style={STYLES.sectionTitle}>Alpes Networks</Text>
					</View>
					<Pressable
						style={STYLES.plusButton}
						onPress={(): void => { props.onPressPlus?.(); }}
						onPressIn={(): void => { setPlusIconColor(AVERAGE_GREY); }}
						onPressOut={(): void => { setPlusIconColor(ALMOST_WHITE); }}
					>
					<View style={[STYLES.buttonBackground, STYLES.backPlusBackground]}>
							<FontAwesomeIcon color={plusIconColor} icon={faPlus} size={30} />
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

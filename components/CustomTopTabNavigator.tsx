import {
	View,
	Text,
	StyleSheet,
	Pressable
} from 'react-native';
import {CULTURED, BLACK, DARKBLUEBLACK, ALMOST_BLACK, ALMOST_WHITE} from '../style/colors';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faQrcode} from '@fortawesome/free-solid-svg-icons/faQrcode';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faMinus} from '@fortawesome/free-solid-svg-icons/faMinus';
import {faArrowRightArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowRightArrowLeft';
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
	modalView: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		top: 0,
		right: 0,
		backgroundColor: CULTURED,
		borderRadius: 10,
		height: 125,
		paddingVertical: 5,
		width: 125,
		shadowColor: DARKBLUEBLACK,
		shadowOffset: {
			width: 0,
			height: 17
		},
		shadowOpacity: 0.25,
		shadowRadius: 18.97,
		elevation: 23
	},
	links: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	linksText: {
		color: ALMOST_BLACK,
		marginLeft: 10,
		width: '45%',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 12
	},
	separator: {
		width: '100%',
		height: 1,
		backgroundColor: ALMOST_BLACK,
		opacity: 0.1
	},
	menu: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		width: 72,
		height: 72
	},
	scan: {
		padding: 10,
		width: 72,
		marginLeft: 30,
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
	onPressRemove?(): void;
	onPressAdd?(): void;
	onPressBack?(): void;
};

const CustomTopTabNavigator = (props: CustomTopTabNavigatorProps): React.ReactElement => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	function renderContent(): React.ReactElement {
		if(props.mode === 'all') {
			return (
				<>
					<Text style={STYLES.sectionTitle}>Alpes Networks</Text>
					<Pressable style={STYLES.scan} onPress={(): void => { props.onPressScan?.(); setIsModalVisible(false); }}>
						<FontAwesomeIcon color={ALMOST_WHITE} icon={faQrcode} size={20} />
					</Pressable>
					<Pressable style={STYLES.menu} onPress={(): void => { setIsModalVisible(true); }}>
							<FontAwesomeIcon color={CULTURED} icon={faBars} size={20} />
					</Pressable>
					<Modal
						isVisible={isModalVisible}
						onBackdropPress={(): void => { setIsModalVisible(false); }}
						animationIn='fadeIn'
						animationOut='fadeOut'
						animationInTiming={10}
						animationOutTiming={10}
						backdropOpacity={0}
					>
						<View style={STYLES.modalView}>
							<Pressable style={STYLES.links} onPress={(): void => { props.onPressScan?.(); setIsModalVisible(false); }}>
								<FontAwesomeIcon color={ALMOST_BLACK} icon={faArrowRightArrowLeft} size={20} />
								<Text style={STYLES.linksText}>Déplacer</Text>
							</Pressable>

							<View style={STYLES.separator} />
							<Pressable style={STYLES.links} onPress={(): void => { props.onPressRemove?.(); setIsModalVisible(false); }}>
								<FontAwesomeIcon color={ALMOST_BLACK} icon={faMinus} size={20} />
								<Text style={STYLES.linksText}>Retirer</Text>
							</Pressable>

							<View style={STYLES.separator} />
							<Pressable style={STYLES.links} onPress={(): void => {props.onPressAdd?.(); setIsModalVisible(false); }}>
								<FontAwesomeIcon color={ALMOST_BLACK} icon={faPlus} size={20} />
								<Text style={STYLES.linksText}>Ajouter</Text>
							</Pressable>
						</View>
					</Modal>
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

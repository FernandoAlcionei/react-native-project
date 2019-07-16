import { StyleSheet } from 'react-native';
import AppStyles from '../config/styles';

const { headers: { HEADER_DEFAULT: { BACKGROUND_COLOR } } } = AppStyles;

const styles = StyleSheet.create({ navBarDefault: { backgroundColor: BACKGROUND_COLOR } });

export default styles;

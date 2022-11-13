import { Dimensions, PixelRatio } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guideLineBaseWidth = 375;

export const scaleSize = (size) => (WINDOW_WIDTH / guideLineBaseWidth) * size;
export const scaleFont = (size) => Math.round(PixelRatio.roundToNearestPixel(size));
export const getWidth = () => WINDOW_WIDTH;
export const getHeight = () => Dimensions.get('window').height;
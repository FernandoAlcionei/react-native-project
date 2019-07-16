import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: { transform: [{ scale: 2 }] },
  labelLoader: { paddingTop: 20 },
});

export default styles;

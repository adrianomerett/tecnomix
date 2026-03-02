import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import IndexNavigation from './src/navigation/IndexNavigation';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#02050CFF' }}>
        <IndexNavigation />
      </SafeAreaView>

    </SafeAreaProvider>
  );
}


export default App;

import AppNavigation from './navigation/appNavigation';
import { ThemeProvider } from './theme/ThemeProvider';

import "react-native-gesture-handler";

export default function App() {
  return (
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
  );
}

import AppNavigation from './navigation/appNavigation';
import { ThemeProvider } from './theme/ThemeProvider';
import UserProvider from "./contexts/UserContext";

import "react-native-gesture-handler";

export default function App() {
  return (
      <ThemeProvider>
          <UserProvider>
              <AppNavigation />
          </UserProvider>
      </ThemeProvider>
  );
}

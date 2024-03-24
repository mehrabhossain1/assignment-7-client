import MainLayout from "./components/layout/MainLayout";
import { useAppSelector } from "./redux/hooks";

function App() {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div
      className={isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
    >
      <MainLayout />
    </div>
  );
}

export default App;

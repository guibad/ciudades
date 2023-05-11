import { AppRouter } from "./AppRouter";
import { InfoHistorialProvider } from "./context/InfoHistorialContext";

function App() {
    return (
        <div className="App">
            <InfoHistorialProvider>
                <AppRouter />
            </InfoHistorialProvider>
        </div>
    );
}

export default App;

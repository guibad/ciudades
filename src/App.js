import { AppRouter } from "./AppRouter";
import { IdiomaContextProvider } from "./context/IdiomaContext";
import { InfoHistorialProvider } from "./context/InfoHistorialContext";

function App() {
    return (
        <div className="App">
            <InfoHistorialProvider>
                <IdiomaContextProvider>
                    <AppRouter />
                </IdiomaContextProvider>
            </InfoHistorialProvider>
        </div>
    );
}

export default App;

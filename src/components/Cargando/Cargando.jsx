import { Ring } from '@uiball/loaders'
import './Cargando.css';

export const Cargando = () => {
    return (
        <div className="container-loader">
            <Ring
                size={70}
                lineWeight={5}
                speed={2}
                color="#6a00ff"
            />
        </div>
    )
};
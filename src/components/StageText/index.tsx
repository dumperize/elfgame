import { useContext, useEffect, useState } from 'react';
import { getStages } from '../../configGame/stages';
import { VARIANT_STAGE } from '../../configGame/variantStage';
import { StageContext, VariantContext } from '../Cycle/Context';
import './styles.css';


export const StageText = () => {
    const { stageID } = useContext(StageContext);
    const { setVariant } = useContext(VariantContext);

    const stage = getStages(stageID);
    const lines = stage.lines || [];
    const [number, setNumber] = useState(0);

    useEffect(() => {
        const handler = () => {
            if (number + 1 >= lines.length) {
                setVariant(VARIANT_STAGE.CHOISES);
                return;
            }
            setNumber((prev) => prev + 1);
        };
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler);
    }, [number]);

    return (
        <div className="shapeText-root">
            <div className='shapeText-wrapper' style={{ backgroundImage: `url(${lines[number].image})` }}>
            </div>
            <div className='shapeText-mainText'>
                {lines[number].character && <b style={{ textTransform: 'uppercase' }}>{lines[number].character}:<br /></b>}
                {lines[number].text}
            </div>
        </div>
    );
}

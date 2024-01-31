import React, {FC} from 'react';
import {Figure} from "./models/figures/Figures";

interface LostFiguresProps {
    title: string;
    figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
    //Здесь будем писать, какие фигуры у какой команды потеряны
    return (
        <div className="lost">
            <h3>{title}</h3>
            {figures.map(figures =>
                <div key={figures.id}>
                    {figures.name} {figures.logo && <img width={20} height={20} src={figures.logo} alt={figures.name} />}
                </div>
            )}
        </div>
    );
};

export default LostFigures;

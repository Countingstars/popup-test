import { FC } from "react";
import { popup } from '../popup';

const SubComponent: FC = () => {

    const clickHandler = () => {
        popup('popup from child component');
    };

    return <div>
        <h4>It's child component here</h4>
        <p>
            <button onClick={clickHandler}>click here to show popup</button>
        </p>
    </div>;

};

export default SubComponent;
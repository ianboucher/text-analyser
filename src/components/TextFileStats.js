import { useEffect, useState } from 'react';


export default function StatsGroup(props) {

    const { files, id } = props;
    const [text, setText] = useState('');
    useEffect(() => readFile(files, setText));

    return (
        <div id={id} data-testid={id}>
            <h3>STATS COMING SOON</h3>
            <p>{text}</p>
        </div>
    );
}

function readFile(files, setText) { // THERE MUST BE A BETTER WAY OF DOING THIS - CURRYING??
    const reader = new FileReader();

    if (files && files.length > 0) {
        reader.onloadend = () => setText(reader.result);
        reader.readAsBinaryString(files[0]);
    } else {
        setText('');
    }
}
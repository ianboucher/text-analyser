import { useEffect, useState } from 'react';
import Stat from './Stat';
import {
    getLineCount,
    getMeanWordLength,
    getMedianWordLength,
    getModalWordLength,
    getMostCommonLetter,
    getWordCount
} from '../statistics';

export default function StatsGroup(props) {

    const { files, id } = props;
    const [text, setText] = useState('');
    useEffect(() => readFile(files, setText));

    return (
        <div id={id} data-testid={id} className="StatsGroup-grid">

            <div id="word-count" data-testid="word-count" className="StatsGroup-grid-item">
                <Stat
                    statName={"Total Word Count"}
                    statValue={getWordCount(text)}
                />
            </div>

            <div id="line-count" data-testid="line-count" className="StatsGroup-grid-item">
                <Stat
                    statName={"Total Line Count"}
                    statValue={getLineCount(text)}
                />
            </div>

            <div id="mean-word-length" data-testid="mean-word-length" className="StatsGroup-grid-item">
                <Stat
                    statName={"Mean Word Length"}
                    statValue={getMeanWordLength(text)}
                />
            </div>

            <div id="modal-word-length" data-testid="modal-word-length" className="StatsGroup-grid-item">
                <Stat
                    statName={"Modal Word Length"}
                    statValue={getModalWordLength(text)}
                />
            </div>

            <div id="median-word-length" data-testid="median-word-length" className="StatsGroup-grid-item">
                <Stat
                    statName={"Median Word Length"}
                    statValue={getMedianWordLength(text)}
                />
            </div>

            <div id="most-common-letter" data-testid="most-common-letter" className="StatsGroup-grid-item">
                <Stat
                    statName={"Most Common Letter"}
                    statValue={getMostCommonLetter(text)}
                />
            </div>
        </div >
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
import { useEffect, useState } from 'react';
import {
    getMeanWordLength,
    getMedianWordLength,
    getModalWordLength,
    getMostCommonLetter,
    getWordCount
} from '../modules/statistics';
import {
    getLetters,
    getLineCount,
    getWords
} from '../modules/textProcessing';
import '../styles/TextFileStats.css';
import Stat from './Stat';

export default function TextFileStats(props) {

    const { files, id } = props;
    const [text, setText] = useState('');
    useEffect(() => readFile(files, setText), [files]);

    const letters = getLetters(text);
    const words = getWords(text);

    return (
        <div files={files} id={id} data-testid={id} className="TestFileStats-grid">

            <div id="word-count" data-testid="word-count" className="TestFileStats-grid-item">
                <Stat
                    statName={"Total Word Count"}
                    statValue={getWordCount(words)}
                />
            </div>

            <div id="line-count" data-testid="line-count" className="TestFileStats-grid-item">
                <Stat
                    statName={"Total Line Count"}
                    statValue={getLineCount(text)}
                />
            </div>

            <div id="mean-word-length" data-testid="mean-word-length" className="TestFileStats-grid-item">
                <Stat
                    statName={"Mean Word Length"}
                    statValue={getMeanWordLength(words)}
                />
            </div>

            <div id="modal-word-length" data-testid="modal-word-length" className="TestFileStats-grid-item">
                <Stat
                    statName={"Modal Word Length"}
                    statValue={getModalWordLength(words)}
                />
            </div>

            <div id="median-word-length" data-testid="median-word-length" className="TestFileStats-grid-item">
                <Stat
                    statName={"Median Word Length"}
                    statValue={getMedianWordLength(words)}
                />
            </div>

            <div id="most-common-letter" data-testid="most-common-letter" className="TestFileStats-grid-item">
                <Stat
                    statName={"Most Common Letter"}
                    statValue={getMostCommonLetter(letters)}
                />
            </div>
        </div >
    );
}

function readFile(files, setText) {
    const reader = new FileReader();

    if (files && files.length > 0) {
        reader.onloadend = () => setText(reader.result);
        reader.readAsBinaryString(files[0]);
    } else {
        setText('');
    }
}
import { useEffect, useState } from 'react';
import {
    getMeanWordLength,
    getMedianWordLength,
    getModalWordLength,
    getMostCommonLetter,
    getMostCommonWords,
    getWordCount,
    getWordLengthFreqs
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
    const wordLengthFreqs = getWordLengthFreqs(words);

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
                    statValue={getMeanWordLength(wordLengthFreqs)}
                />
            </div>

            <div id="modal-word-length" data-testid="modal-word-length" className="TestFileStats-grid-item">
                <Stat
                    statName={"Modal Word Length"}
                    statValue={getModalWordLength(wordLengthFreqs)}
                />
            </div>

            <div id="median-word-length" data-testid="median-word-length" className="TestFileStats-grid-item">
                <Stat
                    statName={"Median Word Length"}
                    statValue={getMedianWordLength(wordLengthFreqs)}
                />
            </div>

            <div id="most-common-letter" data-testid="most-common-letter" className="TestFileStats-grid-item">
                <Stat
                    statName={"Most Common Letter"}
                    statValue={getMostCommonLetter(letters)}
                />
            </div>

            <div id="most-common-words" data-testid="most-common-words" className="TestFileStats-grid-item">
                <Stat
                    statName={"Most Common Letter"}
                    statValue={getMostCommonWords(words).slice(4)}
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
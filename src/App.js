// import logo from './logo.svg';
import './App.css';
import { DropzoneArea } from 'material-ui-dropzone';
import { useState } from 'react';

function App() {

    const [files, setFiles] = useState([]);

    return (
        <div className="App">
            <header className="App-header">
            </header>

            <div id="main-container" className="App-main-content">
                <div id="file-input-container" data-testid="file-input-container" className="App-dropzone">
                    <DropzoneArea
                        onChange={(files) => setFiles(files)}
                        filesLimit={1}
                        acceptedFiles={["text/plain"]}
                        inputProps={{ 'data-testid': "file-input" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;

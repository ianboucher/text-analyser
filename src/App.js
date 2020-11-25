import logo from './img/site-logo.webp';
import './styles/App.css';
import { DropzoneArea } from 'material-ui-dropzone';
import { useState } from 'react';
import TextFileStats from './components/TextFileStats';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function App() {

    const [files, setFiles] = useState([]);

    return (
        <div className="App">
            <header>
                <AppBar position="static">
                    <Toolbar className="App-header">
                        <img src={logo} alt="logo" />
                    </Toolbar>
                </AppBar>
            </header>

            <div id="main-container" className="App-main-content">
                <div id="file-input-container" data-testid="file-input-container" className="App-dropzone">
                    <DropzoneArea
                        onChange={(files) => setFiles(files)}
                        filesLimit={1}
                        maxFileSize={7000000}
                        acceptedFiles={["text/plain"]}
                        inputProps={{ 'data-testid': "file-input" }}
                    />
                </div>

                <TextFileStats
                    id="text-stats"
                    files={files}
                />
            </div>
        </div>
    );
}

export default App;

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import { useState } from 'react';
import TextFileStats from './components/TextFileStats';
import logo from './img/site-logo.webp';
import './styles/App.css';

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

            <div id="title-container" data-testid="title-container" className="App-title">
                <Typography id="main-title" variant="h2" gutterBottom>Riverford Text Analyser</Typography>
                <Typography id="subtitle" variant="h5">Add a .txt file to see some basic statistics!</Typography>
            </div>

            <div id="main-container" className="App-main-content">
                <div id="file-input-container" data-testid="file-input-container" className="App-dropzone">
                    <DropzoneArea
                        onChange={(files) => setFiles(files)}
                        filesLimit={1}
                        maxFileSize={1000000}
                        acceptedFiles={["text/plain"]}
                        inputProps={{ 'data-testid': "file-input" }}
                    />
                </div>

                <div id="file-stats-container" data-testid="file-stats-container" className="App-stats">
                    <TextFileStats
                        id="text-stats"
                        files={files}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;

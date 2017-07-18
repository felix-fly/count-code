import React from 'react';
import { AppBar, Paper, TextField, FloatingActionButton } from 'material-ui';
import IconAdd from 'material-ui/svg-icons/content/add';
import { remote } from 'electron';
import FileUtil from './utils/FileUtil';
import FileList from './components/FileList';
import './styles/base.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: '',
      fileList: [],
      report: {},
      option: {
        useBaseIgnore: true,
        ignoreFolder: '',
        ignoreFile: '',
      },
    };
  }

  onChangeEntry = (e) => {
    const entry = e.target.value;
    this.setState({ entry });
  }

  onSelectPath = () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    }, (filePaths) => {
      const entry = filePaths[0];
      if (entry) {
        this.setState({ entry });
        FileUtil.load({
          entry,
          option: this.state.option,
        }, ({ fileList, report }) => this.setState({ fileList, report }));
      }
    });
  }

  render() {
    const { entry, fileList } = this.state;
    return (
      <div className="main">
        <AppBar
          title="Count Code"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Paper>
          <TextField
            fullWidth
            placeholder="Paste path here and click enter"
            name="base"
            value={entry}
            onChange={this.onChangeEntry}
          />
          <FloatingActionButton>
            <IconAdd
              onClick={this.onSelectPath}
            />
          </FloatingActionButton>
        </Paper>
        <FileList list={fileList} />
      </div>
    );
  }
}

export default App;

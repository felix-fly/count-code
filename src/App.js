import React from 'react';
import { AppBar, Paper, TextField, FloatingActionButton } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import IconAdd from 'material-ui/svg-icons/content/add';
import { remote } from 'electron';
import FileUtil from './utils/FileUtil';
import './styles/base.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: '',
      fileList: [],
    };
  }

  onChangeBase = (e) => {
    const base = e.target.value;
    this.setState({ base });
  }

  onSelectPath = () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
    }, (filePaths) => {
      const base = filePaths[0];
      if (base) {
        this.setState({ base });
        FileUtil.list(base, fileList => this.setState({ fileList }));
      }
    });
  }

  render() {
    const { base, fileList } = this.state;
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
            value={base}
            onChange={this.onChangeBase}
          />
          <FloatingActionButton>
            <IconAdd
              onClick={this.onSelectPath}
            />
          </FloatingActionButton>
        </Paper>
        <List>
          {fileList.map((file, index) =>
            <ListItem key={index} primaryText={file} />,
          )}
        </List>
      </div>
    );
  }
}

export default App;

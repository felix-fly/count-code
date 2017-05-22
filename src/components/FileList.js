import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * File list component
 */
class FileList extends React.Component {
  props: {
    list: Array
  };

  render() {
    const { list } = this.props;
    if (!list || list.length === 0) return null;

    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>File Name</TableHeaderColumn>
            <TableHeaderColumn>Lines</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {list.map((item, index) => (
            <TableRow key={index}>
              <TableRowColumn>{item.file}</TableRowColumn>
              <TableRowColumn>{item.lines}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default FileList;

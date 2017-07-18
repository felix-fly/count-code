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
            <TableHeaderColumn>Total Lines</TableHeaderColumn>
            <TableHeaderColumn>Code Lines</TableHeaderColumn>
            <TableHeaderColumn>Empty Lines</TableHeaderColumn>
            <TableHeaderColumn>Comment Lines</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {list.map((item, index) => (
            <TableRow key={index}>
              <TableRowColumn>{item.file}</TableRowColumn>
              <TableRowColumn>{item.total}</TableRowColumn>
              <TableRowColumn>{item.code}</TableRowColumn>
              <TableRowColumn>{item.empty}</TableRowColumn>
              <TableRowColumn>{item.comment}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default FileList;

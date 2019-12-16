import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDeleteMessage } from '../constants/lang';
import { getFilenameFromPath } from '../utils/helpers';

export default class FilePreview extends Component {

  handleClickDelete(path) {
    const { splat, onClickDelete } = this.props;
    const filename = getFilenameFromPath(path);
    const confirm = window.confirm(getDeleteMessage(filename));
    if (confirm) {
      onClickDelete(splat, filename);
    }
  }

  handleImageError(e) {
    return (
      e.target.src = require('../assets/images/no-image.svg')
    );
  }

  render() {
    const { onClick, file, splat } = this.props;
    let extension = file.extname || '';
    extension = extension.substring(1);
    const image = /png|jpg|gif|jpeg|svg|ico/i.test(extension);
    let node;
    if (image) {
      node = <img src={file.http_url} onError={(e) => this.handleImageError(e)} />;
    } else {
      node = <div><i className="fa fa-file-text-o" aria-hidden="true"/></div>;
    }

    let nodeLink;
    if (onClick) {
      nodeLink = <a onClick={onClick.bind(null, file.http_url)}>{node}</a>;
    } else {
      nodeLink = <a href={file.http_url} target="_blank">{node}</a>;
    }

    let overlay;
    if (file.from_theme) {
      overlay = (
        <span className="theme-indicator">
          <i className="fa fa-diamond" aria-hidden="true" title="Theme Asset" />
        </span>
      );
    } else if (splat != 'index') {
      overlay = (
        <button onClick={() => this.handleClickDelete(file.path)} className="delete" title="Delete file">x</button>
      );
    }

    return (
      <div className="file-preview">
        {overlay}
        {nodeLink}
        <span className="filename">{file.path}</span>
      </div>
    );
  }
}

FilePreview.propTypes = {
  file: PropTypes.object.isRequired,
  splat: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func,
  onClick: PropTypes.func
};

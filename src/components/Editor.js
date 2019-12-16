import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/coffee';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/plain_text';
import 'brace/mode/sass';
import 'brace/mode/scss';
import 'brace/mode/yaml';
import 'brace/theme/monokai';
import Splitter from './Splitter';

class Editor extends Component {

  getValue() {
    return this.refs.ace.editor.getValue();
  }

  render() {
    const { content, type, onEditorChange, readOnly } = this.props;

    let mode;
    if (type) {
      const currentType = type.toLowerCase();
      const extn_modes = ["coffee", "css", "html", "json", "sass", "scss", "yaml"];
      if (extn_modes.includes(currentType)) {
        mode = currentType;
      } else if (currentType == 'js') {
        mode = 'javascript';
      } else if (currentType == 'yml') {
        mode = 'yaml';
      } else {
        mode = 'plain_text';
      }
    }

    return (
      <div>
      <div className="editor-wrap">
        <AceEditor
          editorProps={{ $blockScrolling: Infinity }}
          value={content}
          mode={mode}
          theme="monokai"
          readOnly={readOnly}
          width="100%"
          height="400px"
          showGutter={false}
          showPrintMargin={false}
          highlightActiveLine={false}
          className="editor"
          fontSize={14}
          ref="ace"
          onChange={onEditorChange} />
      </div>
      <div className="editor-mode">Syntax Mode: {mode}</div>
      <Splitter />
      </div>
    );
  }
}

Editor.propTypes = {
  content: PropTypes.any.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  editorChanged: PropTypes.bool,
  readOnly: PropTypes.bool
};

export default Editor;

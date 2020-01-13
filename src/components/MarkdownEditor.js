import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';


class MarkdownEditor extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.create();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.initialValue !== this.props.initialValue;
  }

  componentDidUpdate() {
    this.destroy(); this.create();
  }

  componentWillUnmount() {
    this.destroy();
  }

  create() {
  }

  destroy() {

  }

  render() {
    return (
      <div>
        <CKEditor
          data={this.props.initialValue}
          onChange={evt => this.props.onChange(evt.editor.getData())}
        />
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default MarkdownEditor;

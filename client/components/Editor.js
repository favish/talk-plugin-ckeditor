import React from 'react';
import PropTypes from 'prop-types';
import styles from './Editor.css';
import cn from 'classnames';
import { PLUGIN_NAME } from '../constants';
import { htmlNormalizer } from '../utils';
import CKEditor from 'react-ckeditor-component';
import { Icon } from 'plugin-api/beta/client/components/ui';
import { t } from 'plugin-api/beta/client/services';

class Editor extends React.Component {

  refCKEditor = null;
  editorInstance = null;

  handleRef = refCKEditor => (this.refCKEditor = refCKEditor);

  handleChange = event => {
    console.log(event.editor.document.getBody().getText());
    console.log(event.editor.getData());
    this.props.onInputChange({
      body: event.editor.document.getBody().getText(),
      richTextBody: event.editor.getData(),
    });
  };

  getHTML(props = this.props) {
    if (props.input.richTextBody) {
      return props.input.richTextBody;
    }
    return (
      (props.isEdit && (props.comment.richTextBody || props.comment.body)) || ''
    );
  }

  componentDidMount() {
    if (this.props.registerHook) {
      this.normalizeHook = this.props.registerHook('preSubmit', input => {
        if (input.richTextBody) {
          return {
            ...input,
            richTextBody: htmlNormalizer(input.richTextBody),
          };
        }
      });
    }
  }

  // Update CKEditor when the comment content is cleared
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.input.body.length === 0 &&
      prevProps.input.body.length > 0 &&
      (this.refCKEditor && this.refCKEditor.editorInstance.document.getBody().getText().length > 0)
    ) {
      this.refCKEditor.editorInstance.setData('');
    }
  }

  // TODO - put CKEditor functionality in a sub-component
  handleCKEditorLoad = () => {
    if (!this.bindedCKEditorEvents) {
      // Move the CKEditor dialog windows to the top of the iframe instead of vertical center
      window.CKEDITOR.on('dialogDefinition', event => {
        let definition = event.data.definition;
        if (event.data.name === 'link') {
          // Moving the link dialog exposes the 'Select an Anchor' and Email options, remove them.
          definition.contents[0].elements = definition.contents[0].elements.filter(element => {
            let blacklist = ['anchorOptions', 'emailOptions'];
            return blacklist.indexOf(element.id) === -1;
          });
        }

        definition.dialog.on('show', function (event) {
          let offsetTop = event.sender._.editor.element.getDocumentPosition().y;
          // Pop this onto the end of the show handlers
          setTimeout(() => {
            this.move(this.getPosition().x, offsetTop+10)
          }, 0);
        });
      });
      this.bindedCKEditorEvents = true;
    }

    if (this.props.isReply) {
      this.refCKEditor.editorInstance.focus();
    }
  };

  componentWillUnmount() {
    this.props.unregisterHook(this.normalizeHook);
  }

  render() {
    const { id, placeholder, label, disabled, editorConfig } = this.props;

    return (
      <div className={cn(styles.root, `${PLUGIN_NAME}-container`)}>
        <label
          htmlFor={id}
          className="screen-reader-text"
          aria-hidden={true}
        >
          {label}
        </label>
        <CKEditor
          activeClass={`${PLUGIN_NAME}-editor`}
          config={{
            ...editorConfig,
            readOnly: disabled,
          }}
          ref={this.handleRef}
          content={this.getHTML()}
          placeholder={placeholder}
          id={id}
          events={{
            change: this.handleChange,
            instanceReady: this.handleCKEditorLoad,
          }}
          disabled={disabled}
        />
      </div>
    );
  }
}

Editor.defaultProps = {
  // TODO - Use settings obtained from admin interface for allowedContent - MEA
  editorConfig: {
    allowedContent: {
      '*': { attributes: 'lang,dir', styles: false, classes: false },
      a: { attributes: 'href,hreflang', styles: false, classes: false },
      blockquote: { attributes: 'cite', styles: false, classes: false },
      cite: { attributes: false, styles: false, classes: false },
      code: { attributes: false, styles: false, classes: false },
      dd: { attributes: false, styles: false, classes: false },
      dl: { attributes: false, styles: false, classes: false },
      dt: { attributes: false, styles: false, classes: false },
      em: { attributes: false, styles: false, classes: false },
      li: { attributes: false, styles: false, classes: false },
      ol: { attributes: 'start,type', styles: false, classes: false },
      strong: { attributes: false, styles: false, classes: false },
      sub: { attributes: false, styles: false, classes: false },
      sup: { attributes: false, styles: false, classes: false },
      u: { attributes: false, styles: false, classes: false },
      ul: { attributes: 'type', styles: false, classes: false },
    },
    disableNativeSpellChecker: false,
    entities: false,
    language: 'en',
    pasteFromWordPromptCleanup: true,
    resize_enabled: false,
    toolbar: [
      {
        name: 'Formatting',
        items: ['Bold', 'Italic', 'Underline', 'Superscript', 'Subscript'],
      },
      { name: 'Links', items: ['Link', 'Unlink'] },
      {
        name: 'Lists',
        items: ['BulletedList', 'NumberedList'],
      },
      { name: 'Media', items: ['Blockquote'] },
      { name: 'Tools', items: ['Source'] },
      '/',
    ],
    removePlugins: 'tabletools,contextmenu,tableresize',
    title: 'Rich Text Editor, Comment field',
    contentsLangDirection: 'ltr',
    contentsCss: [],
  },
};

Editor.propTypes = {
  input: PropTypes.object,
  onInputChange: PropTypes.func,
  disabled: PropTypes.bool,
  comment: PropTypes.object,
  registerHook: PropTypes.func,
  unregisterHook: PropTypes.func,
  isReply: PropTypes.bool,
  isEdit: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  editorConfig: PropTypes.object,
};

export default Editor;

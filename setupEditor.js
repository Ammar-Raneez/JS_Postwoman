import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';

export default function setupEditor() {
  const jsonRequestBody = document.querySelector('[data-json-request-body]');
  const jsonResponseBody = document.querySelector('[data-json-response-body]');

  const basicExtensions = [
    basicSetup,
    json(),
    EditorState.tabSize.of(2)
  ];

  const requestEditor = new EditorView({
    state: EditorState.create({
      doc: "{\n\t\n}",
      extensions: basicExtensions
    }),
    parent: jsonRequestBody
  });

  const responseEditor = new EditorView({
    state: EditorState.create({
      doc: "{}",
      extensions: [...basicExtensions, EditorView.editable.of(false)]
    }),
    parent: jsonResponseBody
  });

  function updateResponseEditor(value) {
    responseEditor.dispatch({
      changes: {
        from: 0,
        to: responseEditor.state.doc.length,
        insert: JSON.stringify(value, null, 2)
      }
    });
  }

  return { requestEditor, updateResponseEditor };
}
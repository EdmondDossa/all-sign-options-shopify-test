
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { InlineError, Text } from '@shopify/polaris';


export function CustomTinymce({ onEditorChange, value, title, helperText, error }: {
    title?: string; error?: string; helperText?: string; onEditorChange: Function, value: string
}) {
    const editorRef:any = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
    return (
        <>
            {title && <Text as="span"> {title} </Text>}
        <Editor
          tinymceScriptSrc={'/tinymce/tinymce.min.js'}
          onInit={(evt, editor) => editorRef.current = editor}
                // initialValue='<p>This is the initial content of the editor.</p>'
                onEditorChange={(e, editor) => {
                  onEditorChange(editor.getContent());
                }}
                value={value}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | link image | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
            />
            
            {helperText && (
        <Text as="span" tone="subdued">
          {helperText}
        </Text>
      )}
        {error && (
        <InlineError message={error||""} fieldID="myFieldID" />
      )}
        
      </>
    );
  }
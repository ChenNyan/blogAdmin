'use client'

import React, { useEffect, useRef } from "react";

const editorCfg = {
  language: 'zh-cn'
}

function Editor({ onChange, editorLoaded, name, data }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // 引入本地化文件
      zhCn: require('@ckeditor/ckeditor5-build-classic/build/translations/zh-cn')
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          name={name}
          config={editorCfg}
          editor={ClassicEditor}
          data={data}
          onChange={onChange}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
            // 这里是设置编辑器最小高度，默认没内容高度太矮了
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "min-height",
                "200px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
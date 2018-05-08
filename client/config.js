const config = {
  ckeditor: {
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
      // Add any custom CSS from your site here
      contentsCss: [],
    },
  },
};

module.exports = config;

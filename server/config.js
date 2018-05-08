const config = {
  // Highlight Links
  highlightLinks: true,

  // Linkify Settings
  linkify: {
    className: 'talk-plugin-rich-text-link',
    tagName: 'a',
    target: {
      url: '_blank',
    },
  },

  dompurify: {
    ALLOWED_TAGS: [
      'a',
      'b',
      'i',
      'br',
      'em',
      'strong',
      'cite',
      'blockquote',
      'code',
      'ul',
      'ol',
      'li',
      'dl',
      'dt',
      'dd',
      'u',
      'sup',
      'sub',
      'p',
      '#text',
    ],
    ALLOWED_ATTR: [
      'href',
      'cite',
      'type',
      'start',
      'type',
    ],
  },

  // Secure config for jsdom even when DOMPurify creates a document without a browsing context
  jsdom: {
    features: {
      FetchExternalResources: false, // disables resource loading over HTTP / filesystem
      ProcessExternalResources: false, // do not execute JS within script blocks
    },
  },
};

module.exports = config;

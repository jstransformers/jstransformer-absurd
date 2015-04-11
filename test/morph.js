module.exports = function(absurd, options) {
  if (options.morph === 'html') {
    return absurd.morph('html').add({
      'section.page': {
        h2: '\nHello kitty!\n'
      }
    });
  }
  return absurd.add({
    '.content': {
      padding: 0,
      fs: '20px',
      p: {
        'line-height': '30px'
      }
    }
  });
};

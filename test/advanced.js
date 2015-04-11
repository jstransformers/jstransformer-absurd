module.exports = function(absurd, options) {
  return absurd.add({
    body: {
      cf: 'all',
      p: {
        cf: 'before',
      },
      section: {
        cf: 'after'
      }
    },
    '.content': {
      p: {
        moveto: '10/20/30'
      },
      '.animation': {
        animate: 'fadeInLeftBig',
        fl: 'right'
      }
    }
  });
};

module.exports = function (dest, src, fileType) {
  if (typeof dest !== 'string') {
    dest.basename = dest.basename.replace('.src', '');
    dest.basename = dest.basename.replace('.min', '');
    dest.basename += '.min';

    return dest;
  } else {
    src = src.replace('.src.', '.');

    return dest + (new RegExp('\\.min\\.' + fileType + '$')
        .test(src) ? src : src.replace('.' + fileType, '.min.' + fileType));
  }
};

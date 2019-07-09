import _ from 'lodash';

const mouse = document.createElement('img');

mouse.css = function css(name, value) {
  const styleIsString = _.isString(name);
  // getter
  if (styleIsString && !value) {
    return mouse.style[name];
  }
  // setter
  else if (styleIsString) {
    mouse.style[name] = _.isNumber(value) ? `${value}px` : value;
  }
  // if object, iterate and set values
  else if (_.isPlainObject(name)) {
    _.each(name, (v, k) => css(k, v));
  }
  return mouse;
};

mouse.src = `
  data:image/png;base64,
  iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAQAAACGG/bgAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAA
  HsYAAB7GAZEt8iwAAAAHdElNRQfgAwgMIwdxU/i7AAABZklEQVQ4y43TsU4UURSH8W+XmYwkS2I0
  9CRKpKGhsvIJjG9giQmliHFZlkUIGnEF7KTiCagpsYHWhoTQaiUUxLixYZb5KAAZZhbunu7O/PKf
  e+fcA+/pqwb4DuximEqXhT4iI8dMpBWEsWsuGYdpZFttiLSSgTvhZ1W/SvfO1CvYdV1kPghV68a3
  0zzUWZH5pBqEui7dnqlFmLoq0gxC1XfGZdoLal2kea8ahLoqKXNAJQBT2yJzwUTVt0bS6ANqy1ga
  VCEq/oVTtjji4hQVhhnlYBH4WIJV9vlkXLm+10R8oJb79Jl1j9UdazJRGpkrmNkSF9SOz2T71s7M
  SIfD2lmmfjGSRz3hK8l4w1P+bah/HJLN0sys2JSMZQB+jKo6KSc8vLlLn5ikzF4268Wg2+pPOWW6
  ONcpr3PrXy9VfS473M/D7H+TLmrqsXtOGctvxvMv2oVNP+Av0uHbzbxyJaywyUjx8TlnPY2YxqkD
  dAAAAABJRU5ErkJggg==
`;

mouse.css({
  position: 'fixed',
  zIndex: '999999999',
  pointerEvents: 'none',
  display: 'none'
});

document.body.appendChild(mouse);

export default mouse;
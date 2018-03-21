const phi = 0.5 * (1 + Math.sqrt(5));
const invPhi = 1 / phi;

const Hue = (z) => {
  const v = (z * invPhi) % 1;
  return 360 * (v < 0 ? v + 1 : v);
};

const Color = z => `hsla(${Hue(z)}, 100%, 50%, 1)`;

const Html = (str) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = str;

  // if (wrapper.childNodes.length !== 1) {
  // throw new Error('Html str must contain exactly one top-level tag');
  // }

  return wrapper.firstChild;
};

const Element = (tag, styles = {}) => {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(styles)) {
    el.style[key] = value;
  }

  return el;
};

const animLoop = (fn) => {
  let loop;
  window.requestAnimationFrame(loop = () => {
    fn();
    window.requestAnimationFrame(loop);
  });
};

const range = n => (new Array(n)).fill(0).map((x, i) => i);

window.addEventListener('load', () => {
  const start = Date.now();

  document.body.appendChild(document.createTextNode('123'));

  const lines = range(100).map(i => ({
    base: Element('div', {
      width: '300px',
      height: '1px',
      position: 'absolute',
      left: '10px',
      top: `${150 - i}px`,
    }),
    progress: Element('div', {
      width: '300px',
      height: '1px',
      position: 'absolute',
      left: '10px',
      top: `${150 - i}px`,
    }),
  }));

  for (const { base, progress } of lines) {
    document.body.appendChild(base);
    document.body.appendChild(progress);
  }

  animLoop(() => {
    const t = Date.now() - start;

    for (let i = 0; i !== lines.length; i += 1) {
      const { base, progress } = lines[i];
      const ii = (i + 1) / 101; // 0 < ii < 1
      const log = x => Math.log(x) + Math.log(ii / (1 - ii)) / 10;
      base.style.backgroundColor = Color(Math.floor(log(t)));
      progress.style.backgroundColor = Color(Math.ceil(log(t)));
      progress.style.width = `${300 * (log(t) - Math.floor(log(t)))}px`;
    }
  });
});

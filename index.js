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

const animLoop = (fn) => {
  let loop;
  window.requestAnimationFrame(loop = () => {
    fn();
    window.requestAnimationFrame(loop);
  });
};

window.addEventListener('load', () => {
  const start = Date.now();

  document.body.appendChild(document.createTextNode('125'));

  animLoop(() => {
    const block0 = document.querySelector('#block0');
    const block1 = document.querySelector('#block1');
    const display = document.querySelector('#display');

    const t = Date.now() - start;

    block0.style.backgroundColor = Color(Math.floor(Math.log(t)));
    block1.style.backgroundColor = Color(Math.ceil(Math.log(t)));
    block1.style.width = `${300 * (Math.log(t) - Math.floor(Math.log(t)))}px`;
    display.textContent = t;
  });
});

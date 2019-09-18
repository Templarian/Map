import { ReferenceObject } from 'popper.js';

function getPosition(e: MouseEvent): ReferenceObject {
  console.log(e.clientX, e.clientY);
  const x = e.clientX;
  const y = e.clientY;
  return {
    clientWidth: 0,
    clientHeight: 0,
    getBoundingClientRect(): ClientRect {
      return {
        width: 0,
        height: 0,
        top: y,
        bottom: y,
        left: x,
        right: x
      };
    }
  };
}

export { getPosition };
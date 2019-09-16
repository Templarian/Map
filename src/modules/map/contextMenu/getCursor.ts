import { ReferenceObject } from 'popper.js';

function getCursor(e: MouseEvent): ReferenceObject {
  return {
    clientWidth: 0,
    clientHeight: 0,
    getBoundingClientRect(): ClientRect {
      const x = e.clientX;
      const y = e.clientY;
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

export { getCursor };
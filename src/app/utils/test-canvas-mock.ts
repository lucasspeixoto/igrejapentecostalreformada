import { vi } from 'vitest';

export function mockCanvasContext(): void {
  if (typeof window !== 'undefined') {
    window.HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(
      function (this: HTMLCanvasElement): CanvasRenderingContext2D {
        return {
          canvas: this,
          fillRect: vi.fn(),
          clearRect: vi.fn(),
          getImageData: vi.fn(),
          putImageData: vi.fn(),
          createImageData: vi.fn(),
          setTransform: vi.fn(),
          drawImage: vi.fn(),
          save: vi.fn(),
          fillText: vi.fn(),
          restore: vi.fn(),
          beginPath: vi.fn(),
          moveTo: vi.fn(),
          lineTo: vi.fn(),
          closePath: vi.fn(),
          stroke: vi.fn(),
          translate: vi.fn(),
          scale: vi.fn(),
          rotate: vi.fn(),
          arc: vi.fn(),
          fill: vi.fn(),
          measureText: vi.fn().mockReturnValue({ width: 0 }),
          transform: vi.fn(),
          rect: vi.fn(),
          clip: vi.fn(),
        } as unknown as CanvasRenderingContext2D;
      },
    ) as unknown as typeof window.HTMLCanvasElement.prototype.getContext;
  }
}

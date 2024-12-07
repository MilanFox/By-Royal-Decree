import { CanvasLayerIDs, useRendererStore } from '@stores/renderer';
import type { Color } from '@lib/types';

export interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: Color;
  life: number;
  maxLife: number;
}

const COLORS: Color[] = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];

const particles: ConfettiParticle[] = [];

export default () => {
  const { getCanvasCtx, gameCanvasDimensions } = useRendererStore();

  const createParticle = (side: 'left' | 'right') => {
    const size = Math.random() * 8 + 2;
    const x = side === 'left' ? 0 - size - Math.random() * 50 : gameCanvasDimensions.width + size + Math.random() * 50;
    const y = Math.random() * gameCanvasDimensions.height * 0.5 - size;

    const vx = side === 'left'
      ? Math.random() * 4 + 2 + Math.random() * 2
      : -(Math.random() * 4 + 2 + Math.random() * 2);

    const vy = Math.random() * 2 - 1;

    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const life = 0;
    const maxLife = Math.random() * 150 + 50;

    return { x, y, vx, vy, size, color, life, maxLife };
  };

  const spawnConfetti = (count: number = 250) => {
    const halfCount = Math.ceil(count / 2);
    for (let i = 0; i < halfCount; i++) particles.push(createParticle('left'));
    for (let i = 0; i < count - halfCount; i++) particles.push(createParticle('right'));
  };

  const drawConfetti = () => {
    const ctx = getCanvasCtx(CanvasLayerIDs.CONFETTI);
    if (!ctx) return;

    const gravity = 0.05;

    ctx.clearRect(0, 0, gameCanvasDimensions.width, gameCanvasDimensions.height);

    particles.forEach((particle, index) => {
      particle.vx *= 0.99;
      particle.vy += gravity;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      if (particle.life >= particle.maxLife || particle.y > gameCanvasDimensions.height) {
        particles.splice(index, 1);
      } else {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  return { spawnConfetti, drawConfetti };
};

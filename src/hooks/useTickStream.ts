import { useState, useEffect, useCallback } from 'react';
import { Tick, Market } from '../types';

export const useTickStream = (market: Market, tickCount: number = 100) => {
  const [ticks, setTicks] = useState<Tick[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(1000);

  const generateTick = useCallback((prevPrice: number): Tick => {
    const change = (Math.random() - 0.5) * 2;
    const newPrice = Number((prevPrice + change).toFixed(3));
    const digitString = newPrice.toFixed(3).replace('.', '');
    const lastDigit = parseInt(digitString.slice(-1));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      price: newPrice,
      digit: lastDigit,
      timestamp: Date.now(),
      type: newPrice > prevPrice ? 'up' : 'down',
    };
  }, []);

  useEffect(() => {
    // Initial ticks
    let lastP = 1000 + Math.random() * 100;
    const initialTicks: Tick[] = [];
    for (let i = 0; i < tickCount; i++) {
      const t = generateTick(lastP);
      initialTicks.push(t);
      lastP = t.price;
    }
    setTicks(initialTicks.reverse());
    setCurrentPrice(lastP);

    // Stream simulation
    const interval = setInterval(() => {
      setTicks((prev) => {
        const lastTick = prev[0];
        const newTick = generateTick(lastTick.price);
        setCurrentPrice(newTick.price);
        return [newTick, ...prev].slice(0, tickCount);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [market, tickCount, generateTick]);

  return { ticks, currentPrice };
};
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function CountdownTimer() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('25');

  useEffect(() => {
    let interval: number;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(parseInt(customTime) * 60);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && parseInt(value) <= 999) {
      setCustomTime(value);
    }
  };

  const handleCustomTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minutes = parseInt(customTime) || 25;
    setTime(minutes * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-center">
      <div className="text-7xl font-bold text-gray-800 mb-8">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <form onSubmit={handleCustomTimeSubmit} className="mb-6">
        <div className="flex items-center justify-center space-x-2">
          <input
            type="text"
            value={customTime}
            onChange={handleCustomTimeChange}
            className="w-20 px-3 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Min"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Set
          </button>
        </div>
      </form>

      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Play className="w-5 h-5 mr-2" />
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flag, Trash2 } from 'lucide-react';

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const handleDeleteLap = (index: number) => {
    setLaps((prevLaps) => prevLaps.filter((_, i) => i !== index));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className="text-7xl font-bold text-gray-800 mb-8 font-mono">
        {formatTime(time)}
      </div>

      <div className="flex justify-center space-x-4 mb-8">
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
          onClick={handleLap}
          className={`flex items-center px-6 py-3 bg-indigo-500 text-white rounded-lg transition-colors ${
            !isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'
          }`}
          disabled={!isRunning}
        >
          <Flag className="w-5 h-5 mr-2" />
          Lap
        </button>
        <button
          onClick={handleReset}
          className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Laps</h3>
          <div className="max-h-48 overflow-y-auto">
            {laps.map((lapTime, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg mb-2 group hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-gray-600 mr-4">Lap {laps.length - index}</span>
                  <span className="font-mono text-gray-800">{formatTime(lapTime)}</span>
                </div>
                <button
                  onClick={() => handleDeleteLap(index)}
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600 p-1"
                  title="Delete lap"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
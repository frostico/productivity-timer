import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Settings } from 'lucide-react';

interface PomodoroSettings {
  focusTime: number;
  breakTime: number;
  cycles: number;
}

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<PomodoroSettings>({
    focusTime: 25,
    breakTime: 5,
    cycles: 4
  });

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        setPomodoroCount((prev) => prev + 1);
        setTimeLeft(settings.breakTime * 60);
        setIsBreak(true);
      } else {
        if (pomodoroCount < settings.cycles) {
          setTimeLeft(settings.focusTime * 60);
          setIsBreak(false);
        } else {
          setIsRunning(false);
          setPomodoroCount(0);
        }
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, settings, pomodoroCount]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(settings.focusTime * 60);
    setIsBreak(false);
    setPomodoroCount(0);
  };

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>, setting: keyof PomodoroSettings) => {
    const value = parseInt(e.target.value) || 0;
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeLeft(settings.focusTime * 60);
    setShowSettings(false);
    setIsRunning(false);
    setPomodoroCount(0);
    setIsBreak(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center relative">
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-xl font-semibold text-gray-600">
            {isBreak ? 'Break Time!' : 'Focus Time'}
          </h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Pomodoros completed: {pomodoroCount} / {settings.cycles}
        </div>
      </div>

      {showSettings ? (
        <form onSubmit={handleSettingsSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Pomodoro Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Focus Time (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.focusTime}
                onChange={(e) => handleSettingChange(e, 'focusTime')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Break Time (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.breakTime}
                onChange={(e) => handleSettingChange(e, 'breakTime')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Number of Cycles
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.cycles}
                onChange={(e) => handleSettingChange(e, 'cycles')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="text-7xl font-bold text-gray-800 mb-8">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

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

          {isBreak && (
            <div className="mt-6 flex items-center justify-center text-gray-600">
              <Coffee className="w-5 h-5 mr-2" />
              Take a break and relax!
            </div>
          )}
        </>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Current Settings: {settings.focusTime}min focus / {settings.breakTime}min break / {settings.cycles} cycles
      </div>
    </div>
  );
}
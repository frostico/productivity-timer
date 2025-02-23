import React, { useState } from 'react';
import { Timer, Clock, RotateCcw, Play, Pause, RefreshCw, Settings } from 'lucide-react';
import { CountdownTimer } from './components/CountdownTimer';
import { Stopwatch } from './components/Stopwatch';
import { PomodoroTimer } from './components/PomodoroTimer';

function App() {
  const [activeTab, setActiveTab] = useState<'countdown' | 'pomodoro' | 'stopwatch'>('countdown');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Focus Timer</h1>
          
          <div className="bg-white rounded-xl shadow-2xl p-6">
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('countdown')}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'countdown'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Timer className="w-5 h-5 mr-2" />
                Countdown
              </button>
              <button
                onClick={() => setActiveTab('pomodoro')}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'pomodoro'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Pomodoro
              </button>
              <button
                onClick={() => setActiveTab('stopwatch')}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'stopwatch'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Clock className="w-5 h-5 mr-2" />
                Stopwatch
              </button>
            </div>

            <div className="mt-6">
              {activeTab === 'countdown' && <CountdownTimer />}
              {activeTab === 'pomodoro' && <PomodoroTimer />}
              {activeTab === 'stopwatch' && <Stopwatch />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
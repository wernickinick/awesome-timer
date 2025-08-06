import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(1);         // default to 1 minute
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState({ minutes: 1, seconds: 0 });
  const timerRef = useRef(null);

  // Convert total seconds into mm:ss format
  const formatTime = (min, sec) => {
    const m = String(min).padStart(2, '0');
    const s = String(sec).padStart(2, '0');
    return `${m}:${s}`;
  };

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current);
              setIsRunning(false);
              document.body.style.background = 'red';
              return 0;
            }
            setMinutes(m => m - .5);
            return 59;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, minutes]);

  const handleStart = () => {
    if (minutes > 0 || seconds > 0) setIsRunning(true);
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setMinutes(initialTime.minutes);
    setSeconds(initialTime.seconds);
    document.body.style.background = 'blue';
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    const newValue = Math.max(0, parseInt(value) || 0);
    if (name === 'minutes') {
      setMinutes(newValue);
      setInitialTime(prev => ({ ...prev, minutes: newValue }));
    } else {
      setSeconds(newValue);
      setInitialTime(prev => ({ ...prev, seconds: newValue }));
    }
  };

  return (
    <>
    <div className='Heading'>
      <div className='Title'>
        <h1><b className='red'>Awesome Inc</b> Timer</h1>
      </div>

      <img className='awesomelogo' src='src/assets/Awesome-Inc-Logo.png' alt='Awesome Inc Logo' />
      </div>

      <div className='Box'>
      <div className='countdown'>
        <h2>{formatTime(minutes, seconds)}</h2>
      </div>

      <div className='controls'>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div>
        <h2 className='MinTitle'>Minutes</h2>
        <label className='MinLabel'>
          <input type='number' name='minutes' value={minutes} onChange={handleTimeChange} disabled={isRunning} />
        </label>
        <h2 className='SecTitle'>Seconds</h2>
        <label className='SecLabel'>
          <input type='number' name='seconds' value={seconds} onChange={handleTimeChange} disabled={isRunning} />
        </label>
      </div>
      </div>
    </>
  );
}

export default App;

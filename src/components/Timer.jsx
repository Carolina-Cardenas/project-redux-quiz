import  { useState, useEffect } from "react";

export const Timer = ({ onRestart }) => {
    const initialTime = 5 * 60; // 5 minutos en segundos
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    let timerId;
    useEffect(() => {
    
  
      const countdown = () => {
        timerId = setInterval(() => {
          setTimeRemaining((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(timerId);
              onRestart(); // Llama a la función de reinicio cuando el temporizador llega a 0
              return initialTime;
            }
          });
        }, 1000);
      };
  
      countdown(); // Comienza el temporizador al montar el componente
  
      return () => clearInterval(timerId); // Limpia el temporizador al desmontar el componente
    }, [onRestart]);
  
    const restartTimer = () => {
      clearInterval(timerId); // Limpia cualquier temporizador existente
      setTimeRemaining(initialTime); // Restablece el tiempo restante
    };
  
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
  
    return (
      <div>
        <h2>Timer</h2>
        <p>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </p>
        <button onClick={restartTimer}>Restart</button>
      </div>
    );
  };



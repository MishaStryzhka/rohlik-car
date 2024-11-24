import { nanoid } from '@reduxjs/toolkit';
import { initializeGame } from 'app/games/initializeGame/initializeGame';
import { listenToGame } from 'app/games/listenToGame/listenToGame';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './GameOfThrones.css';

const directions = [
  [-1, 0], // Вгору
  [1, 0], // Вниз
  [0, -1], // Вліво
  [0, 1], // Вправо
];

const MAX_POWER = 2; // Максимальна "сила" квадрата
const TURN_TIME = 10; // Час на хід (в секундах)

const playerColors = {
  1: 'red',
  2: 'blue',
  3: 'green',
  4: 'yellow',
};

const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const GameOfThrones = () => {
  // ===== Game time ======
  const [timeElapsed, setTimeElapsed] = useState(0); // Game time
  const [isGameRunning, setIsGameRunning] = useState(true); // Game status true/false

  useEffect(() => {
    let timer;
    if (isGameRunning) {
      timer = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1); // Increase game time by 1 second
      }, 1000);
    }

    return () => {
      clearInterval(timer); // We clear the interval when the component is unmount or the game is over
    };
  }, [isGameRunning]);

  // ===== Game data
  // eslint-disable-next-line no-unused-vars
  const [gameId, setGameId] = useState(`${nanoid(8)}`);
  const [grid, setGrid] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [timer, setTimer] = useState(TURN_TIME); // Таймер ходу

  // ======= initializeGame =======
  useEffect(() => {
    initializeGame({ gameId });
    listenToGame(gameId, gameData => {
      setGrid(JSON.parse(gameData.grid));
    });
  }, [gameId]);

  // ======= animationGrid =========
  const [animationGrid, setAnimationGrid] = useState(
    Array(8)
      .fill(null)
      .map(() => Array(8).fill(false))
  );
  const explosionsInProgress = useRef(0);

  const checkGameOver = (grid, player) => {
    if (grid.length === 0) return;
    const players = new Set(); // Використовуємо Set для унікальних гравців
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.player !== 0) {
          // Додаємо лише гравців, які володіють квадратами
          players.add(cell.player);
        }
      });
    });

    if (player) {
      return !players.has(player);
    }

    // Якщо залишився лише один гравець, гра завершується
    return players.size === 1;
  };

  const handleEndTurn = () => {
    setTimer(TURN_TIME); // Скидаємо таймер
    setCurrentPlayer(prevPlayer => (prevPlayer % 4) + 1); // Передаємо хід
  };

  if (checkGameOver(grid, currentPlayer)) {
    handleEndTurn();
  }

  // ======= timer ======
  useEffect(() => {
    if (!isGameRunning) return;
    // Запускаємо таймер зворотного відліку
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev > 0) return prev - 1; // Зменшуємо час
        return 0;
      });
    }, 1000);

    // Якщо час вийшов, передаємо хід
    if (timer === 0) {
      handleEndTurn();
    }

    return () => clearInterval(interval); // Очищуємо таймер при зміні стану
  }, [isGameRunning, timer]);

  // ======= checkGameOver =======

  const handleClick = useCallback(
    (row, col) => {
      const cell = grid[row][col];

      // Check if the square belongs to the current player
      if (cell.player !== currentPlayer) {
        alert('Це не ваш квадрат!');
        return;
      }

      const processExplosion = (
        newGrid,
        explosionRow,
        explosionCol,
        player,
        processed,
        newAnimationGrid,
        explosionsInProgress // Pass the active explosion counter
      ) => {
        if (!isGameRunning) return;
        const key = `${explosionRow},${explosionCol}`;
        if (processed.has(key)) return; // Avoiding reprocessing
        processed.add(key);

        // Increment the explosion counter
        explosionsInProgress.current++;

        // Reset the force of the exploded square
        newGrid[explosionRow][explosionCol].power = 0;
        newGrid[explosionRow][explosionCol].player = 0;

        // Capture neighboring squares

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        directions.forEach(async ([dx, dy]) => {
          const newRow = explosionRow + dx;
          const newCol = explosionCol + dy;

          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const neighborCell = newGrid[newRow][newCol];
            neighborCell.player = player;
            neighborCell.power += 1;

            newAnimationGrid[newRow][newCol] = true;

            // If the neighboring square also reaches MAX_POWER, it explodes
            if (neighborCell.power > MAX_POWER) {
              await delay(150); // Зупиняємо виконання на 150 мс

              processExplosion(
                newGrid,
                newRow,
                newCol,
                player,
                processed,
                newAnimationGrid,
                explosionsInProgress
              );
            }
          }
        });

        // Decrement the counter after processing is complete
        setTimeout(() => {
          explosionsInProgress.current--;
          if (explosionsInProgress.current === 0) {
            handleEndTurn(); // Call end of turn when all explosions have finished
          }
        }, 300); // Затримка для синхронізації з анімацією
      };

      if (isGameRunning) {
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
          const newAnimationGrid = animationGrid.map(row => [...row]);

          // Додаємо анімацію для клітинки
          newAnimationGrid[row][col] = true;
          setAnimationGrid(newAnimationGrid);

          // Збільшуємо силу натиснутого квадрата
          newGrid[row][col].power += 1;

          // Якщо натиснутий квадрат досягає MAX_POWER, він вибухає
          if (newGrid[row][col].power > MAX_POWER) {
            const processed = new Set();
            processExplosion(
              newGrid,
              row,
              col,
              currentPlayer,
              processed,
              newAnimationGrid,
              explosionsInProgress
            );
          } else {
            handleEndTurn();
          }

          // Перевіряємо, чи завершена гра
          if (checkGameOver(newGrid)) {
            // Оновлюємо стан для зупинки гри
            setIsGameRunning(false);
          }

          return newGrid;
        });
      }
    },
    [animationGrid, currentPlayer, grid, isGameRunning]
  );

  // AI ChatBot :)
  const handleBotMove = useCallback(() => {
    const botCells = [];
    grid.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (cell.player === currentPlayer) {
          botCells.push({ row: rowIndex, col: colIndex });
        }
      })
    );

    if (botCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * botCells.length);
      const { row, col } = botCells[randomIndex];
      handleClick(row, col);
    } else {
      handleEndTurn();
    }
  }, [currentPlayer, grid, handleClick]);

  // ====== useEffect для ходу бота =======
  useEffect(() => {
    if (
      isGameRunning &&
      (currentPlayer === 2 || currentPlayer === 3 || currentPlayer === 4)
      // false
    ) {
      const botMoveTimeout = setTimeout(() => {
        handleBotMove();
      }, 300);
      return () => clearTimeout(botMoveTimeout);
    }
  }, [currentPlayer, handleBotMove, isGameRunning]);

  return (
    <div>
      <h1 className="game-title">Game of Thrones</h1>
      {/* Індикатор ходу */}
      <div className="game-board">
        <h2>id: {gameId}</h2>
        <h2>time: {formatTime(timeElapsed)}</h2>
      </div>
      <div className="game-board">
        <span
          style={{
            color: playerColors[currentPlayer],
          }}
        >
          {!isGameRunning
            ? `Гравець ${currentPlayer} виграв!`
            : `Player: ${currentPlayer}`}
        </span>
        {isGameRunning && (
          <h2
            style={{
              color: playerColors[currentPlayer],
            }}
          >
            {timer} s.
          </h2>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 40px)',
          gridGap: '2px',
          margin: '20px auto',
          justifyContent: 'center',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
                className={`cell ${
                  animationGrid[rowIndex][colIndex] ? 'capturing' : ''
                }`}
                style={{
                  // width: '40px',
                  // height: '40px',
                  backgroundColor:
                    cell.player === 1
                      ? 'red'
                      : cell.player === 2
                      ? 'blue'
                      : cell.player === 3
                      ? 'green'
                      : cell.player === 4
                      ? 'yellow'
                      : 'white',
                  // border: '1px solid #ccc',
                  // cursor: 'pointer',
                  // display: 'flex',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  // fontWeight: 'bold',
                  // color: '#333',
                }}
              >
                {cell.power > 0 && cell.power}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GameOfThrones;

import "./App.css";
import React, { useEffect, useState, useRef } from 'react';

function App() {

  const [hi, setHi] = useState([]);
  const [size, setSize] = useState(0);
  const [delay, setDelay] = useState(200); // Delay default 200ms
  const isSorting = useRef(false); // Flag pentru oprire sortare

  useEffect(() => {
    generateEvent()
  }, [size])

  function generateEvent() {
    var numbers = [];
    while (numbers.length < size) {
      var ren = Math.floor(Math.random() * size) + 1;
      const x = { height: ren, color: 'black' }
      if (!numbers.some((num) => num.height === x.height)) numbers.push(x);
    }
    setHi(numbers);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function QuickSort() {
    isSorting.current = true;
    let vector = [...hi];

    for (let i = 0; i < size - 1; i++) {
      if (!isSorting.current) break; // verifică flag-ul Stop
      for (let j = i + 1; j < size; j++) {
        if (!isSorting.current) break;

        vector[i].color = vector[j].color = '#B80F0A';
        setHi([...vector]);
        await sleep(delay);

        if (vector[i].height > vector[j].height) {
          vector[i].color = vector[j].color = '#71c7ec';
          setHi([...vector]);
          await sleep(delay);

          [vector[i], vector[j]] = [vector[j], vector[i]];
        }

        vector[i].color = vector[j].color = 'black';
        setHi([...vector]);
      }
    }

    isSorting.current = false;
    setHi([...vector]);
  }

  async function bubbleSort() {
    isSorting.current = true;
    let vector = [...hi];

    for (let i = 0; i < size - 1; i++) {
      if (!isSorting.current) break;
      for (let j = 0; j < size - i - 1; j++) {
        if (!isSorting.current) break;

        vector[j].color = vector[j + 1].color = '#B80F0A';
        setHi([...vector]);
        await sleep(delay);

        if (vector[j].height > vector[j + 1].height) {
          vector[j].color = vector[j + 1].color = '#71c7ec';
          setHi([...vector]);
          await sleep(delay);

          [vector[j], vector[j + 1]] = [vector[j + 1], vector[j]];
        }

        vector[j].color = vector[j + 1].color = 'black';
        setHi([...vector]);
      }
    }

    isSorting.current = false;
    setHi([...vector]);
  }

  async function selectionSort() {
    isSorting.current = true;
    let vector = [...hi];

    for (let i = 0; i < size - 1; i++) {
      if (!isSorting.current) break;
      let min_idx = i;

      for (let j = i + 1; j < size; j++) {
        if (!isSorting.current) break;

        vector[min_idx].color = vector[j].color = '#B80F0A';
        setHi([...vector]);
        await sleep(delay);
        vector[min_idx].color = vector[j].color = 'black';

        if (vector[j].height < vector[min_idx].height) {
          min_idx = j;
        }
      }

      vector[i].color = vector[min_idx].color = '#71c7ec';
      setHi([...vector]);
      await sleep(delay);

      [vector[i], vector[min_idx]] = [vector[min_idx], vector[i]];
      vector[i].color = vector[min_idx].color = 'black';
      setHi([...vector]);
    }

    isSorting.current = false;
    setHi([...vector]);
  }

  function stopSorting() {
    isSorting.current = false; // Oprește sortarea
  }

  return (
    <div className="content">
      <div className="some">
        {hi.map((item, index) => (
          <div key={index} style={{ background: item.color, height: item.height * 5, width: '2rem', marginLeft: 5 }}></div>
        ))}
      </div>

      <div className="menu">
        <div className="sortmenu">
          <button onClick={() => QuickSort()} >QuickSort</button>
          <button onClick={() => bubbleSort()} >BubbleSort</button>
          <button onClick={() => selectionSort()} >SelectionSort</button>
        </div>
        <div className="contentMenu">
        
        <p>Dimensiune</p>
        <div>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            placeholder="Array size"
          />
          
        </div>
        <p>Viteza (ms)</p>
        <div >
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            placeholder="Delay (ms)"
          />
        </div>
        <button onClick={() => generateEvent()} >Generate</button>
        <button onClick={stopSorting} style={{ marginTop: 10 }}>Stop</button>
        </div>
      </div>
    </div>
  );
}

export default App;
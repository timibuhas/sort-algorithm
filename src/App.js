import "./App.css";
import React, { useEffect, useState } from 'react';

function App() {

  const [hi, setHi] = useState([]);
  const [size, setSize] = useState(0)


  useEffect(() => {
    generateEvent()
    console.log("s-a schimbat sizeu")
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

  function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  async function QuickSort() {

    var vector = hi
    for (var i = 0; i < size - 1; i++) {
      for (var j = i + 1; j < size; j++) {

        vector[i].color = vector[j].color = '#B80F0A'
        setHi([...vector])
        await sleep(500 - size)

        if (vector[i].height > vector[j].height) {

          vector[i].color = vector[j].color = '#71c7ec'
          setHi([...vector])
          await sleep(500 - size)

          var a = vector[i];
          vector[i] = vector[j];
          vector[j] = a;
        }

        vector[i].color = vector[j].color = 'black'
      }

    }
    setHi([...vector])

  }
  async function bubbleSort() {
    var vector = hi
    for (var i = 0; i < size - 1; i++) {
      for (var j = 0; j < size - i - 1; j++) {

        vector[j].color = vector[j + 1].color = '#B80F0A'
        setHi([...vector])
        await sleep((size * 10) / size)

        if (vector[j].height > vector[j + 1].height) {

          vector[j].color = vector[j + 1].color = '#71c7ec'
          setHi([...vector])
          await sleep((size * 2) / size)

          var a = vector[j];
          vector[j] = vector[j + 1];
          vector[j + 1] = a;

        }
        vector[j].color = vector[j + 1].color = 'black'
      }


    }
    setHi([...vector])
  }

  async function selectionSort() {
    var i, j, min_idx;
    var vector = hi
    for (i = 0; i < size - 1; i++) {
      // Find the minimum element in unsorted array
      min_idx = i;

      for (j = i + 1; j < size; j++) {

        vector[min_idx].color = vector[j].color = '#B80F0A'
        setHi([...vector])
        await sleep(1)
        vector[min_idx].color = vector[j].color = 'black'

        if (vector[j].height < vector[min_idx].height) {
          min_idx = j;
        }
      }

      vector[i].color = vector[min_idx].color = 'green'
      setHi([...vector])
      await sleep(1)
      vector[i].color = vector[min_idx].color = 'black'

      var a = vector[min_idx];
      vector[min_idx] = vector[i];
      vector[i] = a;


    }
    setHi([...vector])
  }

  return (
    <div className="content">

      <div className="some">
        {
          hi.map((item, index) => (
            <div key={index} style={{ background: item.color, height: (item.height * 5), width: '2rem', marginLeft: 5 }}></div>
          ))
        }
      </div>

      <div className="menu">
        <div className="sortmenu">
          <button onClick={() => QuickSort()} >QuickSort</button>
          <button onClick={() => bubbleSort()} >BubbleSort</button>
          <button onClick={() => selectionSort()} >SelectionSort</button>
        </div>
        <input type="text" value={size} onChange={(e) => setSize(e.target.value)}></input>
        <button onClick={() => generateEvent(size)} >Generate</button>
        <button onClick={() => setHi([])} >Stop</button>
      </div>

    </div>
  );
}

export default App;
import { Character, Characters } from 'utils/types';
import './style.css';
import axios from 'axios';

const notSorted: number[] = [];
for (let i = 0; i < 10000; i++) {
    notSorted.push(Math.floor(Math.random() * 101));
}

function sort(arr: number[]) {
    const start = Date.now();
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    const end = Date.now();
    document.getElementById('time')!.innerText = `${end - start} ms`;
    console.log(end - start);
}

document.getElementById('bubbleButton')?.addEventListener('click', () => {
    sort(notSorted);
});


function swap(arr: number[], i: number, j: number) {
    let temporary = arr[i];
    arr[i] = arr[j];
    arr[j] = temporary
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


async function bubbleSort(array: number[]) {
    const start = Date.now();
    for (let i = array.length; i > 0; i--) {
        if (i % 100 === 0) {
            await sleep(0);
            console.log("In sleep");

        }
        for (let j = 0; j < i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
            }
        }
    }
    const end = Date.now();
    console.log(array);
    document.getElementById('time')!.innerText = `${end - start} ms`;
    console.log(end - start);
}

document.getElementById('bubblePromise')?.addEventListener('click', () => {
    bubbleSort(notSorted);

});

const bubbleSortWorker = new Worker('./worker.js')

const sortByWorker = (): void => {
    console.log('Please wait...')
    bubbleSortWorker.postMessage(notSorted);
    bubbleSortWorker.onmessage = function (message) {
        console.log(message);
        document.getElementById('time')!.innerText = `${message.data} ms`;
    }
};

document.getElementById('bubbleWorker')?.addEventListener('click', () => {
    sortByWorker()
})



const quicksort = (array: number[]): number[] => {
    if (array.length <= 1) {
        return array;
    }
    const pivot = array[Math.floor(array.length / 2)];
    const less = [], equal = [], more = [];
    for (let elem of array) {
        if (elem < pivot) {
            less.push(elem);
        } else if (elem == pivot) {
            equal.push(elem);
        } else if (elem > pivot) {
            more.push(elem);
        }
    }
    return ([...quicksort(less), ...equal, ...quicksort(more)])
};

const doQuickSort = () => {
    const start = Date.now();
    const sortedArr = quicksort(notSorted);
    const end = Date.now();
    console.log(sortedArr);
    document.getElementById('time')!.innerText = (end - start).toString() + ' ms';
}

document.getElementById('quickSort')?.addEventListener('click', () => {
    doQuickSort();
});

(function move() {
    setTimeout(() => {
        document.getElementById('rect')?.classList.add('move');
    }, 10);
    setTimeout(() => {
        document.getElementById('rect')?.classList.remove('move');
    }, 2001);
    setTimeout(() => {
        move();
    }, 4002)
})();

let position = 0;
let direction = 'right';
let width = 900;

function move() {
    if (direction == 'right') {
        position += 5;
        document.getElementById('reqRect')!.style.transform = `translate(${position}%)`;
        if (position > width) {
            direction = 'left';
        }
    }
    if (direction == 'left') {
        position -= 5;
        document.getElementById('reqRect')!.style.transform = `translate(${position}%)`;
        if (position == 0) {
            direction = 'right';
        }
    }
    requestAnimationFrame(move);
}
window.requestAnimationFrame(move);

const fetchData = async (): Promise<void> => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const data: Characters = response.data;
        let allCharacters: Character[] = data.results;

        for (let i = 2; i <= data.info.pages; i += 2) {
            const pageResponse = await axios.get(`https://rickandmortyapi.com/api/character/?page=${i}`);
            const pageCharacters: Characters = pageResponse.data;
            allCharacters = [...allCharacters, ...pageCharacters.results];
        }
        console.log(allCharacters);
        allCharacters.forEach(el => {
            const node = document.createElement('li');
            node.innerText = el.name;
            document.getElementById('rickMortyList')?.appendChild(node);
        });
    } catch (error) {
        console.log(error);
    }
};

fetchData();
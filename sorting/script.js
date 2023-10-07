// Helper function to generate a random array of numbers
function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Bubble Sort
function bubbleSort() {
    let arrayLength = parseInt(document.getElementById('arrayLength').value);
    const array = generateRandomArray(arrayLength, 1, 50000);
    const comparisonsElement = document.getElementById('comparisons');
    const swapsElement = document.getElementById('swaps'); // Add this line
    const timeTakenElement = document.getElementById('timeTaken');
    const arrayElement = document.getElementById('array');

    const startTime = performance.now();
    let comparisons = 0;
    let swaps = 0; // Initialize swaps variable

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            comparisons++;
            if (array[j] > array[j + 1]) {
                // Swap elements
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swaps++; // Increment swaps when a swap is performed
            }
        }
    }

    const endTime = performance.now();

    comparisonsElement.textContent = comparisons;
    swapsElement.textContent = swaps; // Set the swaps count in the HTML element
    timeTakenElement.textContent = (endTime - startTime).toFixed(2) + ' ms';
    arrayElement.textContent = 'Sorted Array: ' + array.join(', ');
}

// Selection Sort
function selectionSort() {
    let arrayLength = parseInt(document.getElementById('arrayLength').value);
    const array = generateRandomArray(arrayLength, 1, 50000);
    const comparisonsElement = document.getElementById('comparisons');
    const swapsElement = document.getElementById('swaps');
    const timeTakenElement = document.getElementById('timeTaken');
    const arrayElement = document.getElementById('array');

    const startTime = performance.now();
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            comparisons++;
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            // Swap elements
            const temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
            swaps++;
        }
    }

    const endTime = performance.now();

    comparisonsElement.textContent = comparisons;
    swapsElement.textContent = swaps;
    timeTakenElement.textContent = (endTime - startTime).toFixed(2) + ' ms';
    arrayElement.textContent = 'Sorted Array: ' + array.join(', ');
}

//Merge Sort
function mergeSort() {
    let arrayLength = parseInt(document.getElementById('arrayLength').value);
    const array = generateRandomArray(arrayLength, 1, 50000);
    const comparisonsElement = document.getElementById('comparisons');
    const swapsElement = document.getElementById('swaps');
    const timeTakenElement = document.getElementById('timeTaken');
    const arrayElement = document.getElementById('array');

    const startTime = performance.now();
    let comparisons = 0;
    let swaps = 0;

    function merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            comparisons++;
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    }

    function mergeSort(array) {
        if (array.length <= 1) {
            return array;
        }

        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);

        return merge(mergeSort(left), mergeSort(right));
    }

    const sortedArray = mergeSort(array);

    const endTime = performance.now();

    comparisonsElement.textContent = comparisons;
    swapsElement.textContent = swaps;
    timeTakenElement.textContent = (endTime - startTime).toFixed(2) + ' ms';
    arrayElement.textContent = 'Sorted Array: ' + sortedArray.join(', ');
}

//Quick Sort
function quickSort() {
    let arrayLength = parseInt(document.getElementById('arrayLength').value);
    const array = generateRandomArray(arrayLength, 1, 50000);
    const comparisonsElement = document.getElementById('comparisons');
    const swapsElement = document.getElementById('swaps');
    const timeTakenElement = document.getElementById('timeTaken');
    const arrayElement = document.getElementById('array');

    const startTime = performance.now();
    let comparisons = 0;
    let swaps = 0;

    function partition(array, low, high) {
        const pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            comparisons++;
            if (array[j] < pivot) {
                i++;
                // Swap elements
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                swaps++;
            }
        }

        // Swap pivot element with the element at i+1
        const temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        swaps++;

        return i + 1;
    }

    function quickSortHelper(array, low, high) {
        if (low < high) {
            const partitionIndex = partition(array, low, high);

            quickSortHelper(array, low, partitionIndex - 1);
            quickSortHelper(array, partitionIndex + 1, high);
        }
    }

    quickSortHelper(array, 0, array.length - 1);

    const endTime = performance.now();

    comparisonsElement.textContent = comparisons;
    swapsElement.textContent = swaps;
    timeTakenElement.textContent = (endTime - startTime).toFixed(2) + ' ms';
    arrayElement.textContent = 'Sorted Array: ' + array.join(', ');
}


//Insertion Sort
function insertionSort() {
    let arrayLength = parseInt(document.getElementById('arrayLength').value);
    const array = generateRandomArray(arrayLength, 1, 50000);
    const comparisonsElement = document.getElementById('comparisons');
    const swapsElement = document.getElementById('swaps');
    const timeTakenElement = document.getElementById('timeTaken');
    const arrayElement = document.getElementById('array');

    const startTime = performance.now();
    let comparisons = 0;
    let swaps = 0;

    for (let i = 1; i < array.length; i++) {
        let currentElement = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > currentElement) {
            comparisons++;
            // Shift elements to the right to make space for the current element
            array[j + 1] = array[j];
            swaps++;
            j--;
        }

        // Place the current element in its correct position
        array[j + 1] = currentElement;
    }

    const endTime = performance.now();

    comparisonsElement.textContent = comparisons;
    swapsElement.textContent = swaps;
    timeTakenElement.textContent = (endTime - startTime).toFixed(2) + ' ms';
    arrayElement.textContent = 'Sorted Array: ' + array.join(', ');
}


//Heap Sort
function heapSort() {
    let arrayLength = parseInt(document.getElementById('arrayLength').value);
    const array = generateRandomArray(arrayLength, 1, 50000);
    const comparisonsElement = document.getElementById('comparisons');
    const swapsElement = document.getElementById('swaps');
    const timeTakenElement = document.getElementById('timeTaken');
    const arrayElement = document.getElementById('array');

    const startTime = performance.now();
    let comparisons = 0;
    let swaps = 0;

    function maxHeapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        comparisons++;
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        comparisons++;
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            // Swap elements
            const temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            swaps++;

            maxHeapify(arr, n, largest);
        }
    }

    function buildMaxHeap(arr) {
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            maxHeapify(arr, n, i);
        }
    }

    function heapSort(arr) {
        const n = arr.length;

        buildMaxHeap(arr);

        for (let i = n - 1; i >= 0; i--) {
            // Swap the root (maximum element) with the last element
            const temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            swaps++;

            // Call maxHeapify on the reduced heap
            maxHeapify(arr, i, 0);
        }
    }

    heapSort(array);

    const endTime = performance.now();

    comparisonsElement.textContent = comparisons;
    swapsElement.textContent = swaps;
    timeTakenElement.textContent = (endTime - startTime).toFixed(2) + ' ms';
    arrayElement.textContent = 'Sorted Array: ' + array.join(', ');
}


document.getElementById('bubbleSortBtn').addEventListener('click', bubbleSort);
document.getElementById('selectionSortBtn').addEventListener('click', selectionSort);
document.getElementById('mergeSortBtn').addEventListener('click', mergeSort);
document.getElementById('quickSortBtn').addEventListener('click', quickSort);
document.getElementById('insertionSortBtn').addEventListener('click', insertionSort);
document.getElementById('heapSortBtn').addEventListener('click', heapSort);
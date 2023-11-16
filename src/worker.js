self.onmessage = function (message) {
    const arr = message.data;
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
    const time = end - start;
    self.postMessage(time);
  }
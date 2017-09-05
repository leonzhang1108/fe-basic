// https://www.2cto.com/kf/201609/548586.html
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
// 冒泡排序
function bubbleSort(arr) {
  console.time('bubble')
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  console.timeEnd('bubble')
  return arr;
}
console.log(bubbleSort(arr));

// 冒泡2
function bubbleSort2(arr) {
  console.time('bubble2')
  var i = arr.length - 1;  //初始时,最后位置保持不变
  while (i > 0) {
    var pos = 0; //每趟开始时,无记录交换
    for (var j = 0; j < i; j++)
      if (arr[j] > arr[j + 1]) {
        pos = j; //记录交换的位置
        var tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
      }
    i = pos; //为下一趟排序作准备
  }
  console.timeEnd('bubble2');
  return arr;
}
console.log(bubbleSort2(arr));

// 选择排序
function selectionSort(arr) {
  var len = arr.length;
  var minIndex, temp;
  console.time('select sort');
  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {     //寻找最小的数
        minIndex = j;                 //将最小数的索引保存
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  console.timeEnd('select sort');
  return arr;
}
console.log(selectionSort(arr));

// 插入排序
function insertionSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    console.time('insert sort');
    for (var i = 1; i < array.length; i++) {
      var key = array[i];
      var j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = key;
    }
    console.timeEnd('insert sort');
    return array;
  } else {
    return 'array is not an Array!';
  }
}
console.log(insertionSort(arr))

// 二分插入
function binaryInsertionSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    console.time('binary insert sort');
    for (var i = 1; i < array.length; i++) {
      var key = array[i], left = 0, right = i - 1;
      while (left <= right) {
        var middle = parseInt((left + right) / 2);
        if (key < array[middle]) {
          right = middle - 1;
        } else {
          left = middle + 1;
        }
      }
      for (var j = i - 1; j >= left; j--) {
        array[j + 1] = array[j];
      }
      array[left] = key;
    }
    console.timeEnd('binary insert sort');
    return array;
  } else {
    return 'array is not an Array!';
  }
}
console.log(binaryInsertionSort(arr))

// 希尔排序
function shellSort(arr) {
  var len = arr.length,
    temp,
    gap = 1;
  console.time('shell sort');
  while (gap < len / 5) {          //动态定义间隔序列
    gap = gap * 5 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  console.timeEnd('shell sort');
  return arr;
}
console.log(binaryInsertionSort(arr))

// 归并排序
function mergeSort(arr) {  //采用自上而下的递归方法
  var len = arr.length;
  if (len < 2) {
    return arr;
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  var result = [];
  console.time('merge sort');
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length)
    result.push(left.shift());
  while (right.length)
    result.push(right.shift());
  console.timeEnd('merge sort');
  return result;
}
console.log(mergeSort(arr));

// 堆排序
function heapSort(array) {
  console.time('heap sort');
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    //建堆
    var heapSize = array.length, temp;
    for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      heapify(array, i, heapSize);
    }
    //堆排序
    for (var j = heapSize - 1; j >= 1; j--) {
      temp = array[0];
      array[0] = array[j];
      array[j] = temp;
      heapify(array, 0, --heapSize);
    }
    console.timeEnd('heap sort');
    return array;
  } else {
    return 'array is not an Array!';
  }
}
/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
  if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
    var l = 2 * x + 1, r = 2 * x + 2, largest = x, temp;
    if (l < len && arr[l] > arr[largest]) {
      largest = l;
    }
    if (r < len && arr[r] > arr[largest]) {
      largest = r;
    }
    if (largest != x) {
      temp = arr[x];
      arr[x] = arr[largest];
      arr[largest] = temp;
      heapify(arr, largest, len);
    }
  } else {
    return 'arr is not an Array or x is not a number!';
  }
}
console.log(heapSort(arr));

// 计数排序
function countingSort(array) {
  var len = array.length,
    B = [],
    C = [],
    min = max = array[0];
  console.time('counting sort');
  for (var i = 0; i < len; i++) {
    min = min <= array[i] ? min : array[i];
    max = max >= array[i] ? max : array[i];
    C[array[i]] = C[array[i]] ? C[array[i]] + 1 : 1;
  }
  for (var j = min; j < max; j++) {
    C[j + 1] = (C[j + 1] || 0) + (C[j] || 0);
  }
  for (var k = len - 1; k >= 0; k--) {
    B[C[array[k]] - 1] = array[k];
    C[array[k]]--;
  }
  console.timeEnd('counting sort');
  return B;
}
console.log(countingSort(arr))

// 桶排序
/*方法说明：桶排序
@param  array 数组
@param  num   桶的数量*/
function bucketSort(array, num) {
  if (array.length <= 1) {
    return array;
  }
  var len = array.length, buckets = [], result = [], min = max = array[0], regex = '/^[1-9]+[0-9]*$/', space, n = 0;
  num = num || ((num > 1 && regex.test(num)) ? num : 10);
  console.time('bucket sort');
  for (var i = 1; i < len; i++) {
    min = min <= array[i] ? min : array[i];
    max = max >= array[i] ? max : array[i];
  }
  space = (max - min + 1) / num;
  for (var j = 0; j < len; j++) {
    var index = Math.floor((array[j] - min) / space);
    if (buckets[index]) {   //  非空桶，插入排序
      var k = buckets[index].length - 1;
      while (k >= 0 && buckets[index][k] > array[j]) {
        buckets[index][k + 1] = buckets[index][k];
        k--;
      }
      buckets[index][k + 1] = array[j];
    } else {    //空桶，初始化
      buckets[index] = [];
      buckets[index].push(array[j]);
    }
  }
  while (n < num) {
    result = result.concat(buckets[n]);
    n++;
  }
  console.timeEnd('bucket sort');
  return result;
}
console.log(bucketSort(arr))

// 基数排序
function radixSort(arr, maxDigit) {
  var mod = 10;
  var dev = 1;
  var counter = [];
  console.time('radix sort');
  for (var i = 0; i < maxDigit; i++ , dev *= 10, mod *= 10) {
    for (var j = 0; j < arr.length; j++) {
      var bucket = parseInt((arr[j] % mod) / dev);
      if (counter[bucket] == null) {
        counter[bucket] = [];
      }
      counter[bucket].push(arr[j]);
    }
    var pos = 0;
    for (var j = 0; j < counter.length; j++) {
      var value = null;
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }
  console.timeEnd('radix sort');
  return arr;
}
console.log(radixSort(arr))

// 快速排序
var quickSort = function (arr) {
  console.time('quick sort');
  if (arr.length <= 1) { return arr; }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  console.timeEnd('quick sort');
  return quickSort(left).concat([pivot], quickSort(right));
};
console.log(quickSort(arr))
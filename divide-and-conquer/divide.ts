/*
Problem: Finding the Maximum Element

Implement a divide and conquer algorithm to find the maximum element in an array of integers.

Input: Array = [5, 8, 3, 9, 2]
Output: Maximum element = 9
*/

const findMax = (numbers: number[]): number => {
  // Base case: If the array has only one element, return it
  if (numbers.length === 1) return numbers[0];

  const midIndex = Math.floor(numbers.length / 2);
  // Divide the array into two halves
  const maxLeft = findMax(numbers.slice(0, midIndex));
  const maxRight = findMax(numbers.slice(midIndex));
  // Compare the maximum values of the left and right branches and return the node with larger value
  return Math.max(maxLeft, maxRight);
};

// console.log(findMax([5, 8, 3, 9, 2]));

/*
Problem: Binary Search
Implement a divide and conquer algorithm to search for a target element in a sorted array of integers. 

Input: Sorted Array = [1, 3, 5, 7, 9], Target = 5
Output: Index of target element = 2
*/

function binarySearchRecursive(
  numbers: number[],
  target: number,
  low: number,
  high: number
): number | null {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);

  if (numbers[mid] === target) return mid;
  // Target on the right side of the array
  if (numbers[mid] < target) {
    // We need to adjust our search parameters, we know that our target is on the right side, so we need to set our low parameter as mid+1.
    // Why do we add/subtract one? Because it prevents infinite loops. If we wouldn't adjust our search space in such way, we could end up in situation where our search space would remain the same for rest of the calls.

    // Example: [1,2,3,4,5], target 5. -> our mid has index 2 and it's value is lesser than our target (3<5), our low now becomes mid which is 2
    //           0 1 2 3 4; left = 0, right 4, mid = Math.max((0+4)/2) = 2
    // -> our search space is now [3,4,5] and our mid is 3. 4<5, so our low now becomes mid which is 3
    //                             2 3 4; left = 2, right = 4, mid = Math.floor((2 + 4) / 2) = 3
    // -> our search space is now [4,5] and our mid is 3, so our low becomes mid which is 3
    //                             3 4; left = 3, right = 4, mid = Math.floor((3+4) /2) = 3
    // -> our search space is now [4,5] and our mid is 3 because Math.floor((3+4) /2) = 3, so our low becomes mid which is 3
    //                             3 4; left = 3, right = 4, mid = Math.floor((3+4) /2) = 3
    // -> we end up in situation that will be recursively called untill we exceed maximum call stack.

    return binarySearchRecursive(numbers, target, mid + 1, high);
  } else {
    // Target on the left side of the array
    return binarySearchRecursive(numbers, target, low, mid - 1);
  }
}

function binarySearch(numbers: number[], target: number): number | null {
  return binarySearchRecursive(numbers, target, 0, numbers.length - 1);
}
console.log(binarySearch([1, 2, 3, 4, 5], 6));

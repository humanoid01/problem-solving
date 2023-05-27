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

console.log(findMax([5, 8, 3, 9, 2]));

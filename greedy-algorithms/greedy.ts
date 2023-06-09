/*
Problem: Fractional Knapsack
Description: You have a knapsack with a maximum weight capacity and a set of items with their respective weights and values. Your goal is to maximize the total value of the items you can fit into the knapsack without exceeding its weight capacity.
Example:
Input:

Maximum weight capacity: 10
Items:
Item 1: Weight = 2, Value = 10
Item 2: Weight = 3, Value = 5
Item 3: Weight = 5, Value = 15
Output: Maximum value that can be achieved is 25.
*/

interface Item {
  weight: number;
  value: number;
}
const knapsack = (items: Item[], capacity: number): number => {
  // Sort items weight to value ratio
  const sortedSack = [...items].sort(
    (a, b) => b.value / b.weight - a.value / a.weight
  );
  let remainingWeight = capacity;
  let totalValue = 0;

  for (let i = 0; i < sortedSack.length; i++) {
    // If our remaining weight is higher or same than current item's weight then subtract it from remaining weight and add it to total value
    const itemWeight = sortedSack[i].weight;
    const itemValue = sortedSack[i].value;
    if (remainingWeight >= itemWeight) {
      remainingWeight -= itemWeight;
      totalValue += itemValue;
    }
  }
  return totalValue;
};

// In this case we won't get optimal weight via greedy approach. We'd need to use dynamic programming.
knapsack(
  [
    { weight: 1, value: 6 },
    { weight: 5, value: 15 },
    { weight: 3, value: 10 },
    { weight: 3, value: 1 },
    { weight: 3, value: 1 },
  ],
  8
);

/*
Problem: Activity Selection
Description: You are given a set of activities with their start and finish times. Design an algorithm to select the maximum number of non-overlapping activities that can be performed, assuming a person can only work on one activity at a time.

Example:
Input:

Activities:
Activity 1: Start time = 1, Finish time = 4
Activity 2: Start time = 3, Finish time = 5
Activity 3: Start time = 0, Finish time = 2
Activity 4: Start time = 5, Finish time = 7
Activity 5: Start time = 8, Finish time = 9
Output: Maximum number of activities that can be performed is 3. (Activity 3, Activity 2, and Activity 5)
*/

interface Activities {
  start: number;
  end: number;
}

const activitySelection = (activities: Activities[]): number => {
  // We sort activities by end times in ascending order
  const sortedActivities = [...activities].sort((a, b) => a.end - b.end);
  let maxActivities = 0;
  let prevEnd = -Infinity;
  for (let i = 0; i < sortedActivities.length; i++) {
    const start = sortedActivities[i].start;
    const end = sortedActivities[i].end;

    // now we check if start of current activity is greater than previous end
    if (start > prevEnd) {
      // if yes, then we assing to previous end current end
      prevEnd = end;
      maxActivities += 1;
    }
  }

  return maxActivities;
};

activitySelection([
  { start: 1, end: 4 },
  { start: 3, end: 5 },
  { start: 0, end: 2 },
  { start: 5, end: 7 },
  { start: 8, end: 9 },
]);

/*
Problem: Coin Change 
Given a set of coin denominations and a target amount, find the minimum number of coins needed to make the change.
Input:
Coins: [1, 5, 10, 25]
Target amount: 36
Output:
Minimum number of coins: 3
Explanation:
The minimum number of coins needed to make 36 cents is 3: two 10-cent coins and one 5-cent coin.
*/

const coinChange = (coins: number[], target: number): number => {
  // We sort coins in descending order to start from the biggest ones
  const sortedCoins = [...coins].sort((a, b) => b - a);
  let remainingTarget = target;
  let numberOfCoins = 0;
  // now we need to iterate untill our target is not zero
  while (remainingTarget !== 0) {
    // iterate through coins and check if current coin has lower or equal value than remaningTarget
    // if yes, we must increment no. coins and subtract current coin from remainingTarget
    for (const coin of sortedCoins) {
      if (coin <= remainingTarget) {
        remainingTarget -= coin;
        numberOfCoins += 1;
        break;
        //lil' break for that 0.0000000000000001s performance boost
      }
    }
  }
  return numberOfCoins;
};
coinChange([1, 5, 10, 25], 36);

/*
Problem: Maximum Product Subarray
Given an array that contains both positive and negative integers, find the product of the maximum product subarray. 

Examples:

Input: arr[] = {6, -3, -10, 0, 2}
Output:   180  // The subarray is {6, -3, -10}

Input: arr[] = {-1, -3, -10, 0, 60}
Output:   60  // The subarray is {60}
*/

const maximumProductSubarr = (numbers: number[]): number => {
  // let max be -Inf, because anything will be bigger than it
  let max = -Infinity;
  // and let currentProduct be 1, because anything but zero multiplied by 1 will give us exactly that number.
  let currentProduct = 1;
  // let's iterate through our array, we can't sort it in this case because we can't mutate our input.
  for (const number of numbers) {
    // if product from our previous iteration is zero, that means that we encountered an zero and we need to assign current number to our current product
    if (currentProduct === 0) {
      currentProduct = number;
      // in case that's the last element in the array
      max = Math.max(currentProduct, max);
      // continue keyword is there so we won't multiply current product by itself later
      continue;
    }

    currentProduct *= number;
    max = Math.max(currentProduct, max);
  }

  return max;
};
// Again this algorithm will give us mostly right answers but there are exceptions where the output will not be correct.
// For this example: [-1, -2, -3, -4, -5], output will be 24, instead of 120, becase on last iteration with greedy approach we will get -120 and 24>-120, so we will get that as an answer.
// We could change it with brute force approach, iterating through current element and then through every other element is the nested loop.
// That would ensure that we iterate through even number of smaller negative numbers, which would give us bigger product at the end.
// console.log(maximumProductSubarr([6, -3, -10, 0, 2])); // 180
// console.log(maximumProductSubarr([-1, -3, -10, 0, 60])); // 60
// console.log(maximumProductSubarr([-7, -10, 0, 60])); // 70

/*
Problem: Job Sequencing

Given an array of jobs where every job has a deadline and associated profit if the job is finished before the deadline. It is also given that every job takes a single unit of time, so the minimum possible deadline for any job is 1. Maximize the total profit if only one job can be scheduled at a time.

Input: Four Jobs with following deadlines and profits

JobID  Deadline  Profit

  a           4          20   
  b           1          10
  c           1          40  
  d           1          30

Output: Following is maximum profit sequence of jobs: c, a   

Input:  Five Jobs with following deadlines and profits

JobID   Deadline  Profit

  a            2          100
  b            1          19
  c            2          27
  d            1          25
  e            3          15

Output: Following is maximum profit sequence of jobs: c, a, e
*/

interface Job {
  [key: string]: { deadline: number; profit: number };
}

const jobSequencing = (jobs: Job[]) => {
  // sort jobs via profits in descending order
  const sortedJobs = jobs.sort((a, b) => {
    const profitA = a[Object.keys(a)[0]].profit;
    const profitB = b[Object.keys(b)[0]].profit;
    return profitB - profitA;
  });

  // let us create queue in which jobs will be placed based on their deadlines
  const queue: Job[] = [];

  for (const job of sortedJobs) {
    const currentJobKey = Object.keys(job)[0];
    // we subtract 1 there, because arrays start from 0. So if we put job with deadline 1 in slot 1, that would mean that our unit of time that we needed to execute our job has already passed.
    let currentJobDeadline = job[currentJobKey].deadline - 1;
    // now we need to check if slot in our queue is free
    if (queue[currentJobDeadline] === undefined) {
      // if it's indeed free, now we can put our job in that slot.
      queue[currentJobDeadline] = job;
    } else {
      // If it's not free we need to check if any slots on the left side are free. We can do that because that will put jobs in the place with deadlines greater than the time they need to be executed.
      // Of course we can do that only to slot with number 0, so that needs to be our stop condition
      while (currentJobDeadline >= 0) {
        // If slot is free then we can assign the job in that place, and move on to the next job
        if (queue[currentJobDeadline] === undefined) {
          queue[currentJobDeadline] = job;
          break;
        }
        currentJobDeadline -= 1;
      }
    }
  }

  // create string for output
  const idsOfSequencialJobs = queue
    .map(job => {
      if (job === undefined) return '';
      const currentJobKey = Object.keys(job)[0];

      return currentJobKey;
    })
    .join('')
    .split('')
    .join(', ');

  return ` Following is maximum profit sequence of jobs ${idsOfSequencialJobs}`;
};

// console.log(
//   jobSequencing([
//     { a: { deadline: 1, profit: 20 } },
//     { b: { deadline: 1, profit: 30 } },
//     { c: { deadline: 2, profit: 40 } },
//     { d: { deadline: 2, profit: 30 } },
//     { e: { deadline: 3, profit: 15 } },
//   ])
// );

/*
Problem:  Optimal Merge Problem 

Explanation:
In the given example, we have three sorted arrays: [2, 5, 8], [1, 3, 6, 9], and [4, 7]. Our task is to merge these arrays into a single sorted array with the minimum number of comparisons.

Input:
Arrays: [2, 5, 8], [1, 3, 6, 9], [4, 7]
(Note: The arrays are already sorted)

Output:
Merged Array: [1, 2, 3, 4, 5, 6, 7, 8, 9]
(Number of comparisons: 14)

*/

const optimalMerge = (...arrays: number[][]) => {
  const sortedArrays = [...arrays].sort((a, b) => a.length - b.length);

  const mergedArrays: number[][] = [];
  let currentMerged: number[] = [];
  for (let i = 0; i < sortedArrays.length; i++) {
    const currentArray = sortedArrays[i];
    // we need to skip pushing to mergedArrays on our first iteration, because we didn't merge second array yet. It will prevent buggy calculations later on while calculating comparisons.
    if (i === 0) {
      currentMerged.push(...currentArray);
      continue;
    }
    currentMerged.push(...currentArray);
    // we push on every other iteration current merged arrays, just to calculate comparisons correctly
    mergedArrays.push([...currentMerged]);
  }
  // calculate our comparisons by adding lengths of each of ours arrays we pushed on each iteration but first.
  const comparisons = mergedArrays.reduce(
    (accumulator, currArr) => currArr.length + accumulator,
    0
  );
  // return final merged array and comparisons
  const finalMerged = mergedArrays[mergedArrays.length - 1].sort(
    (a, b) => a - b
  );

  return { merged: finalMerged, comparisons };
};
console.log(optimalMerge([2, 5, 8], [1, 3, 6, 9], [4, 7]));

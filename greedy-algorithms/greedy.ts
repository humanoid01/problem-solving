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

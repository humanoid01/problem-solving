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
const knapsack = (items: Item[], capacity: number) => {
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

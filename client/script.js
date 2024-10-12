function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

const obj1 = { x: 1, y: [1, 2, 3], z: 3 };
const obj2 = { y: [1, 2], w: [3] };

const result = mergeObjects(obj1, obj2);

console.log(result); // Output: { x: 1, y: [1, 2], z: 3, w: [3] }

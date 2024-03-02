export const reorderArray = (array, currentPos, newPos) => {
  const newArray = [...array];
  const [removedItem] = newArray.splice(currentPos, 1);
  newArray.splice(newPos, 0, removedItem);
  return newArray;
};

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.round(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

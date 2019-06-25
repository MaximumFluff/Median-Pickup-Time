function calculateMedian(arr) {
  // First sort the array by pickup times
  arr.sort((a, b) => {
    return a.pickup_time - b.pickup_time;
  })

  let middle = Math.floor(arr.length / 2);

  // Return middle element if length is odd, otherwise calculate the median if length is even
  return arr.length % 2 !== 0 ? parseInt(arr[middle].pickup_time) : (parseInt(arr[middle + 1].pickup_time) + parseInt(arr[middle].pickup_time)) / 2;
}

module.exports = calculateMedian;
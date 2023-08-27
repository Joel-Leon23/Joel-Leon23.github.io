function knapsack(maxWeight, weightList, valueList, numItems) {
  let maxValueMatrix = []; // matriz para almacenar los valores máximos posibles en cada paso
  let includedItemsMatrix = []; // matriz para almacenar si un elemento fue incluido o no en cada paso

  // Inicializar las matrices
  for (let i = 0; i <= numItems; i++) {
    maxValueMatrix[i] = [];
    includedItemsMatrix[i] = [];
    for (let w = 0; w <= maxWeight; w++) {
      if (i === 0 || w === 0) {
        maxValueMatrix[i][w] = 0; // Si no hay elementos o el peso es 0, el valor máximo es 0
        continue;
      }
      if (weightList[i - 1] > w) {
        maxValueMatrix[i][w] = maxValueMatrix[i - 1][w];
        includedItemsMatrix[i][w] = 0; // Elemento no añadido
        continue;
      }

      if (valueList[i - 1] + maxValueMatrix[i - 1][w - weightList[i - 1]] > maxValueMatrix[i - 1][w]) {
        // Si el valor del elemento actual + el valor máximo obtenido con el peso restante 
        // es mayor que el valor máximo sin incluir el elemento actual, entonces incluir el elemento.
        maxValueMatrix[i][w] = valueList[i - 1] + maxValueMatrix[i - 1][w - weightList[i - 1]];
        includedItemsMatrix[i][w] = 1; // Elemento añadido
      } else {
        // Si no, conservar el valor máximo sin incluir el elemento actual.
        maxValueMatrix[i][w] = maxValueMatrix[i - 1][w];
        includedItemsMatrix[i][w] = 0; // Elemento no añadido
      }
    }
  }
  // Recuperar los elementos añadidos a la mochila
  let resultItems = [];
  let remainingWeight = maxWeight;
  for (let i = numItems; i > 0; i--) {
    if (includedItemsMatrix[i][remainingWeight] == 1) {
      resultItems.push(i - 1); // Añadir el índice del elemento añadido
      remainingWeight = remainingWeight - weightList[i - 1];
    }
  }

  // Devolver el valor máximo y los índices de los elementos añadidos a la mochila
  return { maxValue: maxValueMatrix[numItems][maxWeight], items: resultItems.sort() };
}
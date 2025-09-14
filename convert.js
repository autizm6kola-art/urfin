const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'data.txt');  // файл с твоими данными
const outputFile = path.join(__dirname, 'data.json');

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка при чтении файла:', err);
    return;
  }

  // Разбиваем файл на строки
  const lines = data.trim().split('\n');

  // Парсим каждую строку в объект
  const jsonData = lines.map(line => {
    const parts = line.split('|').map(part => part.trim());
    return {
      id: Number(parts[0]),
      audio: parts[1],
      text: parts[2],
      correctAnswer: parts[3].toLowerCase() === 'true'
    };
  });

  // Записываем в json файл
  fs.writeFile(outputFile, JSON.stringify(jsonData, null, 2), err => {
    if (err) {
      console.error('Ошибка при записи JSON:', err);
    } else {
      console.log('JSON успешно создан:', outputFile);
    }
  });
});

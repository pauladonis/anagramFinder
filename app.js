const fs = require('fs');

function readData(file) {
    var data = fs.readFileSync(file, 'utf8');
    return data.split('\n');
}

function storeData(data) {
    fs.appendFile('output.txt', data + '\n', function (err) {
        if (err) throw err;
    });
}

function isAnagram(word1, word2) {
    return word1.toUpperCase().split('').sort().join('') === word2.toUpperCase().split('').sort().join('')
}

function arrangeWords(words) {

    let processedWords = [];

    for (let i = 0; i < words.length; i++) {
        if (processedWords.includes(words[i])) {
            continue;
        }

        var anagramIsFound = false;

        for (let j = i + 1; j < words.length; j++) {
            if (isAnagram(words[i], words[j])) {
                storeData(words[i] + " " + words[j]);
                processedWords.push(words[i]);
                processedWords.push(words[j]);
                anagramIsFound = true;
                break;
            }
        }

        if (anagramIsFound) {
            continue;
        }
        storeData(words[i]);
        processedWords.push(words[i]);

    }
}

function generateFileWithAnagrams() {
    var fileName = process.argv[2]
    var words = readData(fileName);
    arrangeWords(words);
}

generateFileWithAnagrams();
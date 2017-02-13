//
// Vincent Truong 10137376 B05
//
function getStats(txt) {
	txt = txt.toLowerCase();
	return{
		nChars: txt.length,
		nWords: getNumberWords(txt),
		nLines: getNumberLines(txt),
		nNonEmptyLines: getNonEmptyLines(txt),
		averageWordLength: getAverageWordLength(txt),
		maxLineLength: getMaxLineLength(txt),
		palindromes: getPalindromes(txt),
		longestWords: getLongestWords(txt),
		mostFrequentWords: getMostFrequentWords(txt)
	};
}

function getNumberWords(txt)
{
	//parse out non-alphanumeric characters
	txt = txt.replace(/[^0-9a-z]/g," ");
	txt = txt.split(" ");
	return txt.filter(function(v){return v!==''}).length;	
}

function getNumberLines(txt)
{
	//empty line means no lines
	if (txt.length == 0){
		return 0;
	}
	
	//regex split based on line characters and count length
	else{
		return txt.split(/\r\n|\r|\n/).length;
	}
		
}

function getNonEmptyLines(txt)
{
	//match white space and non-whitespace characters and find length
	return txt.match((/^\s*\S/gm) || "").length;
}

function getAverageWordLength(txt)
{
	//parse out non-alphanumeric characters
	txt = txt.replace(/[^0-9a-z]/g," ");
	txt = txt.split(" ");
	var wordArray = txt.filter(function(v){return v!==''});
	
	//add up total word count
	var wordCount = 0;
	for (i = 0; i <wordArray.length; i++)
	{
		wordCount += wordArray[i].length;
	}
	
	//find average
	return wordCount/wordArray.length;
}

function getMaxLineLength(txt)
{
	//replace characters with only \n to enable counting
	txt = txt.replace(/\r\n/,"\n");
	var lineArray = txt.split("\n");//split by new line
	
	var maxLength = 0;
	
	//find max line length
	for (i=0; i<lineArray.length; i++)
	{
		if (lineArray[i].length > maxLength)
		{
			maxLength = lineArray[i].length;
		}
	}
	
	return maxLength;
}

function getPalindromes(txt)
{
	//parse out non-alphanumeric characters
	txt = txt.replace(/[^0-9a-z]/g," ");
	txt = txt.split(" ");
	var wordArray = txt.filter(function(v){return v!==''});
	
	//if word is palindrome then it is added to array
	var palindromeArray = [];
	for (i = 0; i <wordArray.length; i++)
	{
		if (isPalindrome(wordArray[i]) && wordArray[i].length > 1 && palindromeArray.indexOf(wordArray[i])== -1)//no duplicates, and 1 character palindromes
		{
			palindromeArray.push(wordArray[i]);
		}
	}
	
	return palindromeArray;
}

function isPalindrome(txt)
{
	//base case
	if (txt.length==0 || txt.length==1)
	{
		return true;
	}
	
	//recursive case
	else
	{			
		if (txt.length > 1 && txt.charAt(0) == txt.charAt(txt.length - 1))
		{
			return isPalindrome(txt.substring(1,txt.length-1));
		}
		
		else
		{
			return false;
		}
	}
}

function getLongestWords(txt)
{
	//parse out non-alphanumeric characters
	txt = txt.replace(/[^0-9a-z]/g," ");
	txt = txt.split(" ");
	var wordArray = txt.filter(function(v){return v!==''});
	
	//get list of words sorted by length and alphabetical order
	return mergeSort(wordArray).slice(0,10);
}

function mergeSort(wordArray)
{
	//base case, array is length 1 or 0, which is trivially sorted
	if (wordArray.length < 2)
		return wordArray;
	
	//split array in half
	var middle = parseInt(wordArray.length/2);
	var left = wordArray.slice(0, middle);
	var right = wordArray.slice(middle, wordArray.length);
	
	//recurse
	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
	var result = [];
	
	//Combine both sides and add to new array
	//sorted by highest length & alphabetical order
	//only unique words
	while (left.length && right.length) 
	{
		if (left[0].length > right[0].length) 
		{
			if (result.indexOf(left[0])== -1)
				result.push(left.shift());
			
			else
				left.shift();
		} 
		
		else if (left[0].length == right[0].length && left[0] < right[0])
		{
			if (result.indexOf(left[0])== -1)
				result.push(left.shift());
			
			else
				left.shift();
		}
		else {
			if (result.indexOf(right[0])== -1)
				result.push(right.shift());
			
			else
				right.shift();
		}
	}
 
	//add rest of the words to result array
	while (left.length)
	{
		if (result.indexOf(left[0])== -1)
				result.push(left.shift());
			
		else
			left.shift();
 
	}	
	
	//add rest of the words to result array
	while (right.length)
	{	
		if (result.indexOf(right[0])== -1)
				result.push(right.shift());
			
		else
			right.shift();
	}
	 
    return result;
}

function getMostFrequentWords(txt)
{
	//parse out non-alphanumeric characters
	txt = txt.replace(/[^0-9a-z]/g," ");
	txt = txt.split(" ");
	var wordArray = txt.filter(function(v){return v!==''});
	
	//iterate through alphabetically sorted list of unique words, and for each unique word count the occurences of that word in the original duplicated-filled array 
	var sortedWordArray = mergeSort(wordArray);
	var mostFrequentWordsArray = [];
	var freqencyArray =[];
	
	for(var i=0;i<sortedWordArray.length;i++)
	{
		var count = wordArray.filter(item => item == sortedWordArray[i]).length;
		mostFrequentWordsArray[i] = sortedWordArray[i];
		freqencyArray[i]=count;
	}
		
		
	//sort the two arrays (words, and frequency count) by highest frequency count and alphabetical order
	var isElementSwapped;
    do 
	{
        isElementSwapped = false;
        for (var i=0; i < mostFrequentWordsArray.length-1; i++) 
		{
			//if frequency of next word is higher than current index's word, swap
            if (freqencyArray[i] < freqencyArray[i+1]) {
                var temp = freqencyArray[i];
                freqencyArray[i] = freqencyArray[i+1];
                freqencyArray[i+1] = temp;
				
				temp = mostFrequentWordsArray[i];
                mostFrequentWordsArray[i] = mostFrequentWordsArray[i+1];
                mostFrequentWordsArray[i+1] = temp;
				
                isElementSwapped = true;
            }
			
			//if next word's frequency is equal but it comes before current index's word alphabetical-wise, swap
			else if (freqencyArray[i] == freqencyArray[i+1] && mostFrequentWordsArray[i] > mostFrequentWordsArray[i+1]) 
			{
                var temp = freqencyArray[i];
                freqencyArray[i] = freqencyArray[i+1];
                freqencyArray[i+1] = temp;
				
				temp = mostFrequentWordsArray[i];
                mostFrequentWordsArray[i] = mostFrequentWordsArray[i+1];
                mostFrequentWordsArray[i+1] = temp;
				
                isElementSwapped = true;
            }
        }
    } while (isElementSwapped);
	
	
	//concatenate the sorted words and frequencies into one array
	for (var i=0; i < mostFrequentWordsArray.length; i++) 
	{
		mostFrequentWordsArray[i] = mostFrequentWordsArray[i] + "(" + freqencyArray[i] + ")";
	}
	
	return mostFrequentWordsArray.slice(0,10);
}
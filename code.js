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
		longestWords: getLongestWords(txt).slice(0,10),
		mostFrequentWords: getMostFrequentWords(txt)
	};
}

function getNumberWords(txt)
{
	txt = txt.replace(/[^0-9a-z]/g," ");
	txt = txt.split(" ");
	return txt.filter(function(v){return v!==''}).length;	
}

function getNumberLines(txt)
{
	if (txt.length == 0){
		return 0;
	}
	
	else{
		return txt.split(/\r\n|\r|\n/).length;
	}
		
}

function getNonEmptyLines(txt)
{
	return 0;
}

function getAverageWordLength(txt)
{
	txt = txt.replace(/[^0-9a-z]/g," ");
	txt = txt.split(" ");
	wordArray = txt.filter(function(v){return v!==''});
	
	var wordCount = 0;
	for (i = 0; i <wordArray.length; i++)
	{
		wordCount += wordArray[i].length;
	}
	
	return wordCount/wordArray.length;
}

function getMaxLineLength(txt)
{
	txt = txt.replace(/\r\n/,"\n");
	wordArray = txt.split("\n");
	
	var maxLength = 0;
	
	for (i=0; i<wordArray.length; i++)
	{
		if (wordArray[i].length > maxLength)
		{
			maxLength = wordArray[i].length;
		}
	}
	
	return maxLength;
}

function getPalindromes(txt)
{
	txt = txt.replace(/[^0-9a-z]/g," ");
	txt = txt.split(" ");
	wordArray = txt.filter(function(v){return v!==''});
	
	var palindromeArray = [];
	for (i = 0; i <wordArray.length; i++)
	{
		if (isPalindrome(wordArray[i]) && wordArray[i].length > 1 && palindromeArray.indexOf(wordArray[i])== -1){
			palindromeArray.push(wordArray[i]);
		}
	}
	
	return palindromeArray;
}

function isPalindrome(txt)
{
	if (txt.length==0 || txt.length==1)
	{
		return true;
	}
	
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
	txt = txt.replace(/[^0-9a-z]/g," ");
	txt = txt.split(" ");
	wordArray = txt.filter(function(v){return v!==''});
	
	return mergeSort(wordArray);
	
	
	
}

function mergeSort(wordArray)
{
	if (wordArray.length < 2)
		return wordArray;
	
	var middle = parseInt(wordArray.length/2);
	var left = wordArray.slice(0, middle);
	var right = wordArray.slice(middle, wordArray.length);
	
	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
	var result = [];
	
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
	 
		while (left.length)
		{
			if (result.indexOf(left[0])== -1)
					result.push(left.shift());
				
			else
				left.shift();
	 
		}	
		
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

}
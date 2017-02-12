//
// Vincent Truong 10137376 B05
//
function getStats(txt) {
	return{
		nChars: txt.length,
		nWords: getNumberWords(txt),
		nLines: getNumberLines(txt),
		nNonEmptyLines: getNonEmptyLines(txt),
		averageWordLength: getAverageWordLength(txt),
		maxLineLength: getMaxLineLength(txt),
		palindromes: getPalindromes(txt),
		longestWords: ["xxxxxxxxx", "123444444"],
		mostFrequentWords: ["hello(7)", "world(1)"]
	};
}

function getNumberWords(txt)
{
	txt = txt.replace(/[^0-9A-Z]/gi," ");
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
	txt = txt.replace(/[^0-9A-Z]/gi," ");
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
	txt = txt.replace(/[^0-9A-Z]/gi," ");
	txt = txt.split(" ");
	wordArray = txt.filter(function(v){return v!==''});
	
	var palindromeArray = [];
	for (i = 0; i <wordArray.length; i++)
	{
		if (isPalindrome(wordArray[i])){
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
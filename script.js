function reverseString(str) {
    let listOfChars = str.split('')
    let reverseListOfChars = listOfChars.reverse()
    let reversedString = reverseListOfChars.join('')
  
    return reversedString
  }
  
  function isPalindrome(str) {
    let reverse = reverseString(str)
    return reverse === str
  }
  
  function convertDateToString(date) { //date is object
    let dateStr = {
      //dateStr is returned after appending '0' acc to if/else
      day: '',
      month: '',
      year: ''
    }
  
    //appending '0' before a unit day/month
    if (date.day < 10) {
      dateStr.day = '0' + date.day // str + num -> strConc
    } else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
  
    return dateStr
  }
  
  function getAllDateFormats(date) {
    let dateStr = convertDateToString(date);
  
    //formats that we will check
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
  }
  
  function checkPalindromeForAllDateFormats(date) {
    let listOfPalindromes = getAllDateFormats(date);//returns an array
  
    let flag = false;
  
    for (let i = 0, len = listOfPalindromes.length; i < len; i++) {
      if (isPalindrome(listOfPalindromes[i])) {
        flag = true;
        break; //breaks as soon as one of the 6formats is a palindrome
      }
    }
  
    return flag;
  }
  
  //check the nearest palindrome logic
  
  function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }
  
  function getNextDate(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
  
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
    //february
    if(month === 2){
      if(isLeapYear(year)){
        if(day > 29){
          day = 1;
          month++
        }
      }
      else{
        if(day > 28){
          day = 1;
          month++;
        }
      }
    }
    else{
      if(day > daysInMonth[month - 1]){
        day = 1;
        month++;
      }
    }
    if(month > 12){
      month = 1;
      year++
    }
    
    return {
      day : day,
      month: month,
      year: year
    }
  }
  
  function getNextPalindromeDate(date){
    let counter = 0;
    let nextDate = getNextDate(date);
  
    while(true){
      counter++;
      let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
  
    return [counter, nextDate]
  }
  
  const dateInput = document.querySelector("#date-input")
  const checkBtn = document.querySelector("#check-btn")
  
  const outputEl = document.querySelector("#output-el")
  
  function clickHandler(){
    let birthdayStr = dateInput.value;
  
    if(birthdayStr !== ''){
      let listOfDate = birthdayStr.split('-')
  
      let date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
  
      let isPalindrome = checkPalindromeForAllDateFormats(date)
      if(isPalindrome){
        outputEl.innerText = 'You are born on a palindrome, Lucky Guy'
      }else{
        let [counter, nextDate] = getNextPalindromeDate(date);
        outputEl.innerText = `You missed the palindrome by ${counter} days, it would have been a palindrome on ${nextDate.day}-${nextDate.month}-${nextDate.year}`
      }
    }
  }
  
  checkBtn.addEventListener('click', clickHandler)
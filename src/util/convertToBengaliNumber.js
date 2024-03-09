const convertToBengaliNumber = (number) => {


  const bengaliNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number.toString().replace(/\d/g, (digit) => bengaliNumbers[digit]);
};


  export default convertToBengaliNumber;
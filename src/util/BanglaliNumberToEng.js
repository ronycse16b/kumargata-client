const bengaliToEnglish = (bengaliNumber) => {


  const bengaliToEnglishMap = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  const englishNumber = bengaliNumber.replace(/[০-৯]/g, (match) => {
    return bengaliToEnglishMap[match];
  });

  return englishNumber;
};

export default bengaliToEnglish;

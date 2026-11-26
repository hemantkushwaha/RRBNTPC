import { Difficulty, QuestionLabel, SectionId } from '../data/types';

export type Language = 'en' | 'hi';

export const TOPIC_HI: Record<string, string> = {
  'Number System': 'संख्या पद्धति',
  'Units & Measurements': 'मात्रक और मापन',
  'LCM & HCF': 'ल.स.प. और म.स.प.',
  'Ratio & Proportion': 'अनुपात और समानुपात',
  Percentage: 'प्रतिशत',
  Average: 'औसत',
  'Mass, Weight & Density': 'द्रव्यमान, भार और घनत्व',
  'Heat & Temperature': 'ऊष्मा और तापमान',
  'Linear Equations': 'रैखिक समीकरण',
  'Kinetic Energy': 'गतिज ऊर्जा',
  'Profit & Loss': 'लाभ और हानि',
  Discount: 'बट्टा / छूट',
  'Time, Speed & Distance': 'चाल, समय और दूरी',
  'Relative Velocity': 'सापेक्ष वेग',
  'Time & Work': 'समय और कार्य',
  'Arithmetic Progression': 'समांतर श्रेणी',
  'Basic Electricity': 'बुनियादी विद्युत',
  'Work, Power & Energy': 'कार्य, शक्ति और ऊर्जा',
  'Levers & Simple Machines': 'उत्तोलक और सरल मशीनें',
  Algebra: 'बीजगणित',
  'Geometry & Area': 'ज्यामिति और क्षेत्रफल',
  'Basic Statistics': 'बुनियादी सांख्यिकी',
  Trigonometry: 'त्रिकोणमिति',
  Volume: 'आयतन',
  Friction: 'घर्षण',
  'Speed & Velocity': 'चाल और वेग',
  'Basic Probability': 'बुनियादी प्रायिकता',
  Geometry: 'ज्यामिति',
  'Table DI': 'सारणी डेटा व्याख्या',
  'Percentage DI': 'प्रतिशत डेटा व्याख्या',
  'Average DI': 'औसत डेटा व्याख्या',
  'Table DI (Ratio)': 'सारणी डेटा व्याख्या (अनुपात)',
  'Bar Graph DI': 'दंड आरेख डेटा व्याख्या',
  'Bar Graph DI (Percentage)': 'दंड आरेख (प्रतिशत)',
  'Bar Graph DI (Average)': 'दंड आरेख (औसत)',
  'Pie Chart DI': 'पाई चार्ट डेटा व्याख्या',
  'Line Graph DI': 'रेखा आरेख डेटा व्याख्या',
  'Line Graph DI (Weighted Total)': 'रेखा आरेख (कुल विलंब)',
  'Trend & Percentage DI': 'प्रवृत्ति एवं प्रतिशत विश्लेषण',
  'Line Graph DI (Combined Rate)': 'रेखा आरेख (संयुक्त दर)',
  'Venn Diagram DI': 'वेन आरेख डेटा व्याख्या',
  'Scatter Plot & Curve DI': 'प्रकीर्ण आरेख एवं वक्र विश्लेषण',
  'Data Distribution DI': 'आँकड़ा वितरण विश्लेषण',
  'Statistical Curve (Cumulative DI)': 'सांख्यिकीय संचयी वक्र',
  'Data Arrangement DI': 'आँकड़ा व्यवस्था विश्लेषण',
  'Text-Based DI': 'पाठ-आधारित डेटा व्याख्या',
  'Multi-Source DI': 'बहु-स्रोत डेटा व्याख्या',
  'Multi-Source DI (Percentage)': 'बहु-स्रोत डेटा व्याख्या (प्रतिशत)',
  'Multi-Source DI (Sensitivity)': 'बहु-स्रोत संवेदनशीलता विश्लेषण',
  'Data Sufficiency': 'आँकड़ा पर्याप्तता',
  'Inconsistency Detection DI': 'विसंगति पहचान विश्लेषण',
  'Trend & Inference DI': 'प्रवृत्ति एवं निष्कर्ष विश्लेषण',
  'Missing-Value Data Distribution DI': 'लुप्त-मान आँकड़ा वितरण',
  Syllogism: 'न्याय निगमन',
  'Blood Relations': 'रक्त संबंध',
  Calendars: 'कैलेंडर',
  Clocks: 'घड़ी',
  Assumptions: 'पूर्वधारणाएँ',
  'Family Tree': 'वंश वृक्ष',
  'Binary Logic': 'द्विआधारी तर्क',
  'Logical Puzzle': 'तार्किक पहेली',
  'RC — Main Idea': 'अपठित गद्यांश — मुख्य विचार',
  'RC — Supporting Idea': 'अपठित गद्यांश — सहायक तथ्य',
  'RC — Application': 'अपठित गद्यांश — अनुप्रयोग',
  'RC — Inference': 'अपठित गद्यांश — अनुमान',
  'RC — Logical Structure': 'अपठित गद्यांश — तार्किक संरचना',
  'RC — Author’s Purpose': 'अपठित गद्यांश — लेखक का उद्देश्य',
  'RC — Tone & Style': 'अपठित गद्यांश — स्वर एवं शैली',
  'RC — Logical Conclusion': 'अपठित गद्यांश — तार्किक निष्कर्ष',
  'Number Series': 'संख्या श्रृंखला',
  'Letter Series': 'अक्षर श्रृंखला',
  Analogy: 'सादृश्यता',
  'Coding-Decoding': 'कूटलेखन-कूटवाचन',
  Ranking: 'क्रम व्यवस्था',
  'Logical Sequence': 'तार्किक अनुक्रम',
  'Analogy (Numerical)': 'संख्यात्मक सादृश्यता',
  'Series Completion': 'श्रृंखला पूर्ति',
  'Order & Position': 'क्रम एवं स्थान',
  'Arrangements (Linear)': 'रेखीय बैठक व्यवस्था',
  'Pattern Recognition': 'पैटर्न पहचान',
  'Number Series (Wrong Term)': 'संख्या श्रृंखला (गलत पद)',
  'Arrangements (Circular)': 'वृत्तीय बैठक व्यवस्था',
  'Pattern Recognition (Alphanumeric)': 'अक्षरांकीय पैटर्न पहचान',
  'Order & Position (Inequalities)': 'क्रम एवं तुलना',
  'Analogy (Number Set)': 'संख्या समुच्चय सादृश्यता',
};

export const SECTION_TEXT: Record<
  SectionId,
  {
    code: Record<Language, string>;
    title: Record<Language, string>;
    shortTitle: Record<Language, string>;
    syllabus: Record<Language, string>;
  }
> = {
  '1A': {
    code: { en: 'Section 1A', hi: 'खंड 1A' },
    title: {
      en: 'Basic Science & Mathematics',
      hi: 'बुनियादी विज्ञान एवं गणित',
    },
    shortTitle: { en: 'Science & Math', hi: 'विज्ञान व गणित' },
    syllabus: {
      en: 'Number System, Ratio, Average, Percentage, Profit & Loss, Discount, TSD, Time & Work, Algebra, AP, LCM/HCF, Geometry, Trigonometry, Mensuration, Probability, Statistics, Mechanics, Heat, Electricity & Simple Machines.',
      hi: 'संख्या पद्धति, अनुपात, औसत, प्रतिशत, लाभ-हानि, बट्टा, चाल-समय-दूरी, समय व कार्य, बीजगणित, समांतर श्रेणी, ल.स.प./म.स.प., ज्यामिति, त्रिकोणमिति, क्षेत्रमिति, प्रायिकता, सांख्यिकी, यांत्रिकी, ऊष्मा, विद्युत और सरल मशीनें।',
    },
  },
  '1B': {
    code: { en: 'Section 1B', hi: 'खंड 1B' },
    title: {
      en: 'Data Analysis & Interpretation',
      hi: 'डेटा विश्लेषण एवं व्याख्या',
    },
    shortTitle: { en: 'Data Analysis', hi: 'डेटा विश्लेषण' },
    syllabus: {
      en: 'Tables, Bar/Line/Pie/Scatter Graphs, Frequency Curves, Venn Diagrams, Data Sufficiency, Data Arrangement, Multi-Source & Text DI, Trend Inference & Inconsistency Detection.',
      hi: 'सारणी, दंड/रेखा/पाई/प्रकीर्ण आरेख, आवृत्ति वक्र, वेन आरेख, आँकड़ा पर्याप्तता, आँकड़ा व्यवस्था, बहु-स्रोत व पाठ-आधारित DI, प्रवृत्ति निष्कर्ष और विसंगति पहचान।',
    },
  },
  '2': {
    code: { en: 'Section 2', hi: 'खंड 2' },
    title: { en: 'Logical Capability', hi: 'तार्किक क्षमता' },
    shortTitle: { en: 'Logical Capability', hi: 'तार्किक क्षमता' },
    syllabus: {
      en: 'Syllogism, Blood Relations, Family Trees, Clocks, Calendars, Assumptions, Binary Logic, Analytical Puzzles (Q61–Q70) & Passage-Based Reading Comprehension (Q71–Q80).',
      hi: 'न्याय निगमन, रक्त संबंध, वंश वृक्ष, घड़ी, कैलेंडर, पूर्वधारणाएँ, द्विआधारी तर्क, तार्किक पहेलियाँ (Q61–Q70) और गद्यांश-आधारित अपठित बोध (Q71–Q80)।',
    },
  },
  '3': {
    code: { en: 'Section 3', hi: 'खंड 3' },
    title: { en: 'Mental Reasoning', hi: 'मानसिक तर्कशक्ति' },
    shortTitle: { en: 'Mental Reasoning', hi: 'मानसिक तर्कशक्ति' },
    syllabus: {
      en: 'Number & Letter Series, Series Completion, Analogy, Coding-Decoding, Ranking, Order & Position, Linear & Circular Arrangements, Pattern Recognition & Logical Sequences.',
      hi: 'संख्या व अक्षर श्रृंखला, श्रृंखला पूर्ति, सादृश्यता, कूटलेखन-कूटवाचन, क्रम व्यवस्था, रेखीय व वृत्तीय बैठक व्यवस्था, पैटर्न पहचान और तार्किक अनुक्रम।',
    },
  },
};

export function localizeTopic(topic: string, lang: Language): string {
  if (lang === 'en') return topic;
  return TOPIC_HI[topic] ?? topic;
}

export function localizeDifficulty(diff: Difficulty, lang: Language): string {
  if (lang === 'en') return diff;
  if (diff === 'Easy') return 'आसान';
  if (diff === 'Moderate') return 'मध्यम';
  return 'कठिन';
}

export function localizeLabel(label: QuestionLabel, lang: Language): string {
  if (lang === 'en') return label;
  return label === 'Previous-Year Pattern Question'
    ? 'विगत-वर्ष पैटर्न प्रश्न'
    : 'मॉडल अभ्यास प्रश्न';
}

export const UI_TEXT = {
  en: {
    brand: 'RRB CEN 08/2026',
    navPaper: 'Mock Paper',
    navCbt: 'CBT Simulator',
    navKey: 'Answer Key',
    navFormulas: 'Formulas',
    startCbt: 'Start CBT Exam',
    viewFullPaper: 'View Full Paper',
    footerLine:
      'RRB Station Master CEN No. 08/2026 · 100 Questions · 120 Minutes · +1 / −1/3 Marking',

    // Paper Header & Generator
    paperKicker:
      'CEN No. 08/2026 · Computer-Based Test Mock Paper · Bilingual (English / हिंदी)',
    paperTitle: 'RRB Station Master Complete 100-Question CBT Mock Paper',
    paperSubtitle:
      'Verified 100-question bilingual examination covering Basic Science & Mathematics, Data Analysis & Interpretation, Logical Capability (with original Reading Comprehension), and Mental Reasoning. Zero General Knowledge or trivia.',
    copyMd: 'Copy Paper (.md)',
    copiedMd: 'Copied Markdown',
    downloadMd: 'Download .md',
    takeCbt: 'Take Timed CBT Test',
    generateAiPaper: 'Generate New Randomized Paper',
    generatingPaper: 'Generating Bilingual Paper...',
    restoreStandardPaper: 'Restore Standard Verified Paper',
    activePaperStandard: 'Active Set: Standard Verified Mock Paper #1 (100 Qs)',
    activePaperGenerated: 'Active Set: Fresh AI-Generated Randomized Mock Paper',
    shuffleOrder: 'Shuffle Section Order',

    // Stats strip
    statQuestions: 'Total Questions',
    statQuestionsVal: '100 MCQs',
    statQuestionsSub: '4 Sections · Q1 to Q100',
    statDuration: 'Duration',
    statDurationVal: '120 Minutes',
    statDurationSub: '1.20 min average per Q',
    statMarking: 'Marking Scheme',
    statMarkingVal: '+1 / −0.33',
    statMarkingSub: '100 Max Marks · −1/3 wrong',
    statDifficulty: 'Difficulty Gradient',
    statDifficultySub: 'Easy / Moderate / Difficult',

    // Filters
    all100Qs: 'All 100 Qs',
    searchPlaceholder: 'Filter by topic or Q#...',
    hideSolutions: 'Hide Solutions (Practice)',
    showSolutions: 'Show All Solutions',
    difficultyLabel: 'Difficulty:',
    patternLabel: 'Pattern:',
    all: 'All',
    prevYearShort: 'Previous-Year Pattern',
    modelPracticeShort: 'Model Practice',
    showingCount: (shown: number, total: number) =>
      `Showing ${shown} of ${total} questions`,
    noMatchesTitle: 'No questions match the selected filters',
    noMatchesDesc:
      'Reset the section, difficulty, or search term to view all questions.',
    resetFilters: 'Reset Filters',
    directions: 'Directions',
    theme: 'Theme',
    marks: 'Marks',
    correctBadge: 'Correct',
    wrongBadge: 'Wrong',
    correctAnswer: 'Correct Answer',
    explanation: 'Explanation',
    shortcut: 'Shortcut / Trick',
    hideExplanation: 'Hide Explanation',
    revealPrompt:
      'Select an option above to check your answer or reveal the worked solution.',
    revealBtn: 'Reveal Answer & Shortcut',

    // CBT Simulator
    timeLeft: 'Time Left',
    pause: 'Pause',
    resume: 'Resume',
    submitTest: 'Submit Test',
    questionOf: (curr: number, total: number) => `Question ${curr} of ${total}`,
    marksMeta: 'Marks: +1 / −0.33',
    markForReview: 'Mark for Review',
    markedForReview: 'Marked for Review',
    clearResponse: 'Clear Response',
    previous: 'Previous',
    saveAndNext: 'Save & Next',
    finishAndReview: 'Finish & Review',
    questionPalette: 'Question Palette',
    answeredOf: (a: number, t: number) => `${a} / ${t} Answered`,
    legendAnswered: 'Answered',
    legendReview: 'Review',
    legendNotAnswered: 'Not Answered',
    legendCurrent: 'Current',
    resetAttempt: 'Reset Attempt',
    submitExamination: 'Submit Examination',
    submitModalTitle: 'Submit RRB Station Master CBT Mock?',
    submitModalDesc:
      'Your score will be evaluated immediately using +1 for correct answers and −1/3 negative marking for incorrect responses.',
    skipped: 'Skipped',
    forReview: 'For Review',
    continueTest: 'Continue Test',
    confirmSubmit: 'Confirm Submit',

    // Scorecard
    scorecardKicker: 'CEN No. 08/2026 · Official +1 / −1/3 Evaluation Report',
    scorecardTitle: 'CBT Mock Examination Scorecard',
    retakeCbt: 'Retake 120-Min CBT',
    netCbtScore: 'Net CBT Score',
    outOf100: 'out of 100.00',
    correctPlus: 'Correct (+1)',
    wrongMinus: 'Wrong (−1/3)',
    penaltyLabel: 'penalty',
    marksGainLabel: 'marks',
    accuracy: 'Accuracy',
    attemptedOf100: (n: number) => `${n} / 100 attempted`,
    timeTaken: 'Time Taken',
    ofLimit: 'of 02:00:00 limit',
    colSection: 'Section',
    colAttempted: 'Attempted',
    colCorrect: 'Correct',
    colWrong: 'Wrong',
    colAccuracy: 'Accuracy',
    colNetScore: 'Net Score',
    responseReviewTitle: 'Response Review & Worked Solutions',
    filterAll: 'All',
    filterIncorrect: 'Incorrect',
    filterSkipped: 'Skipped',
    unattemptedTag: 'Unattempted (0.00)',
    correctTag: 'Correct (+1.00)',
    wrongTag: (picked: string) => `Wrong (−0.33) · You picked ${picked}`,

    // Answer Key & Calculator
    akKicker:
      'Official RRB CBT Marking Scheme (+1 Correct · −1/3 Wrong · 0 Unattempted)',
    akTitle: 'Answer Key, Negative Marking (−1/3) Analysis & 120-Minute Strategy',
    akSubtitle:
      'Every three wrong answers erase one full mark earned from a correct response. Use the interactive estimator below to test how accuracy impacts your net CEN 08/2026 score.',
    simCorrectLabel: 'Correct Answers (+1 mark each)',
    simWrongLabel: 'Wrong Answers (−0.333 mark each)',
    questionsUnit: 'questions',
    maxLabel: 'max',
    projectedNetScore: 'Projected Net Score',
    negativePenalty: 'Negative Penalty',
    marksDeducted: 'marks deducted',
    accuracyRate: 'Accuracy Rate',
    attemptedSkipped: 'Attempted / Skipped',
    workedScenariosTitle: 'Worked Negative Marking (−1/3) Scenarios',
    workedScenariosSub:
      'Comparing disciplined high-accuracy attempts against over-attempting with guesses.',
    strategyTitle: '120-Minute Time-Management & Target Allocation',
    strategySub:
      'Recommended Pass-1 (85 min) + Pass-2 Review (25 min) + Final Verification (10 min).',
    masterKeyTitle: 'Complete 1–100 Master Answer Key',
    masterKeySub:
      'Every answer verified against step-by-step calculations and logical deductions.',
    allSections: 'All Sections',
    allDifficulties: 'All Difficulties',
    colQNo: 'Q.No',
    colTopic: 'Topic',
    colDifficulty: 'Difficulty',
    colClassification: 'Classification',
    colAnswer: 'Answer',
    colCorrectValue: 'Correct Value',

    // Formulas
    formulasKicker: 'Quick Revision Reference · CEN No. 08/2026',
    formulasTitle: 'Key Formulas, Shortcuts & Common Exam Pitfalls',
    formulasSubtitle:
      'High-yield mathematical identities, physics relationships, DI conversion tricks, and the most frequent negative-marking traps tested in the RRB Station Master CBT.',
    pitfallsTitle: 'Seven High-Frequency CBT Exam Pitfalls & How to Avoid Them',
    pitfallLabel: 'Pitfall:',
    preventionLabel: 'Prevention:',
  },
  hi: {
    brand: 'RRB CEN 08/2026',
    navPaper: 'मॉक पेपर',
    navCbt: 'CBT सिम्युलेटर',
    navKey: 'उत्तर कुंजी',
    navFormulas: 'सूत्र व सावधानियाँ',
    startCbt: 'CBT परीक्षा शुरू करें',
    viewFullPaper: 'पूर्ण पेपर देखें',
    footerLine:
      'RRB स्टेशन मास्टर CEN सं. 08/2026 · 100 प्रश्न · 120 मिनट · +1 / −1/3 अंकन योजना',

    // Paper Header & Generator
    paperKicker:
      'CEN सं. 08/2026 · कंप्यूटर आधारित परीक्षा (CBT) मॉक पेपर · द्विभाषी (English / हिंदी)',
    paperTitle: 'RRB स्टेशन मास्टर पूर्ण 100-प्रश्न CBT मॉक पेपर',
    paperSubtitle:
      'बुनियादी विज्ञान एवं गणित, डेटा विश्लेषण एवं व्याख्या, तार्किक क्षमता (मौलिक अपठित गद्यांश सहित) और मानसिक तर्कशक्ति पर आधारित सत्यापित 100-प्रश्न द्विभाषी मॉक पेपर। सामान्य ज्ञान (GK/GS) के बिना पूर्णतः पाठ्यक्रम-आधारित।',
    copyMd: 'पेपर कॉपी करें (.md)',
    copiedMd: 'मार्कडाउन कॉपी हुआ',
    downloadMd: 'डाउनलोड .md',
    takeCbt: 'समयबद्ध CBT परीक्षा दें',
    generateAiPaper: 'नया रैंडम मॉक पेपर बनाएँ',
    generatingPaper: 'द्विभाषी पेपर तैयार हो रहा है...',
    restoreStandardPaper: 'मानक सत्यापित पेपर पर लौटें',
    activePaperStandard: 'सक्रिय सेट: मानक सत्यापित मॉक पेपर #1 (100 प्रश्न)',
    activePaperGenerated: 'सक्रिय सेट: नया AI-जनित रैंडम द्विभाषी मॉक पेपर',
    shuffleOrder: 'प्रश्न क्रम बदलें',

    // Stats strip
    statQuestions: 'कुल प्रश्न',
    statQuestionsVal: '100 बहुविकल्पीय',
    statQuestionsSub: '4 खंड · Q1 से Q100',
    statDuration: 'परीक्षा अवधि',
    statDurationVal: '120 मिनट',
    statDurationSub: 'औसत 1.20 मिनट प्रति प्रश्न',
    statMarking: 'अंकन योजना',
    statMarkingVal: '+1 / −0.33',
    statMarkingSub: '100 अधिकतम अंक · −1/3 नकारात्मक',
    statDifficulty: 'कठिनाई स्तर',
    statDifficultySub: 'आसान / मध्यम / कठिन',

    // Filters
    all100Qs: 'सभी 100 प्रश्न',
    searchPlaceholder: 'विषय या प्रश्न संख्या खोजें...',
    hideSolutions: 'हल छिपाएँ (अभ्यास मोड)',
    showSolutions: 'सभी हल दिखाएँ',
    difficultyLabel: 'कठिनाई:',
    patternLabel: 'पैटर्न:',
    all: 'सभी',
    prevYearShort: 'विगत-वर्ष पैटर्न',
    modelPracticeShort: 'मॉडल अभ्यास',
    showingCount: (shown: number, total: number) =>
      `${total} में से ${shown} प्रश्न दिखाए जा रहे हैं`,
    noMatchesTitle: 'चयनित फ़िल्टर से कोई प्रश्न मेल नहीं खाता',
    noMatchesDesc:
      'सभी प्रश्न देखने के लिए खंड, कठिनाई स्तर या खोज शब्द रीसेट करें।',
    resetFilters: 'फ़िल्टर रीसेट करें',
    directions: 'निर्देश',
    theme: 'विषय-वस्तु',
    marks: 'अंक',
    correctBadge: 'सही',
    wrongBadge: 'गलत',
    correctAnswer: 'सही उत्तर',
    explanation: 'व्याख्या',
    shortcut: 'शॉर्टकट / ट्रिक',
    hideExplanation: 'व्याख्या छिपाएँ',
    revealPrompt:
      'अपना उत्तर जाँचने के लिए ऊपर कोई विकल्प चुनें या विस्तृत हल देखें।',
    revealBtn: 'उत्तर और शॉर्टकट देखें',

    // CBT Simulator
    timeLeft: 'शेष समय',
    pause: 'रोकें',
    resume: 'जारी रखें',
    submitTest: 'परीक्षा सबमिट करें',
    questionOf: (curr: number, total: number) => `प्रश्न ${curr} / ${total}`,
    marksMeta: 'अंक: +1 / −0.33',
    markForReview: 'समीक्षा के लिए चिह्नित करें',
    markedForReview: 'समीक्षा हेतु चिह्नित',
    clearResponse: 'उत्तर हटाएँ',
    previous: 'पिछला',
    saveAndNext: 'सहेजें और अगला',
    finishAndReview: 'समाप्त व समीक्षा करें',
    questionPalette: 'प्रश्न पैलेट',
    answeredOf: (a: number, t: number) => `${a} / ${t} उत्तरित`,
    legendAnswered: 'उत्तरित',
    legendReview: 'समीक्षा हेतु',
    legendNotAnswered: 'अनुत्तरित',
    legendCurrent: 'वर्तमान',
    resetAttempt: 'पुनः प्रयास करें',
    submitExamination: 'परीक्षा सबमिट करें',
    submitModalTitle: 'क्या आप RRB स्टेशन मास्टर CBT मॉक सबमिट करना चाहते हैं?',
    submitModalDesc:
      'आपके स्कोर का मूल्यांकन तुरंत +1 सही उत्तर और −1/3 गलत उत्तर (नकारात्मक अंकन) के आधार पर किया जाएगा।',
    skipped: 'छोड़े गए',
    forReview: 'समीक्षा हेतु',
    continueTest: 'परीक्षा जारी रखें',
    confirmSubmit: 'सबमिट की पुष्टि करें',

    // Scorecard
    scorecardKicker: 'CEN सं. 08/2026 · आधिकारिक +1 / −1/3 मूल्यांकन रिपोर्ट',
    scorecardTitle: 'CBT मॉक परीक्षा स्कोरकार्ड',
    retakeCbt: '120-मिनट CBT पुनः दें',
    netCbtScore: 'कुल शुद्ध स्कोर',
    outOf100: '100.00 में से',
    correctPlus: 'सही (+1)',
    wrongMinus: 'गलत (−1/3)',
    penaltyLabel: 'कटौती',
    marksGainLabel: 'अंक',
    accuracy: 'सटीकता',
    attemptedOf100: (n: number) => `${n} / 100 हल किए गए`,
    timeTaken: 'लिया गया समय',
    ofLimit: '02:00:00 सीमा में से',
    colSection: 'खंड',
    colAttempted: 'प्रयास किए',
    colCorrect: 'सही',
    colWrong: 'गलत',
    colAccuracy: 'सटीकता',
    colNetScore: 'शुद्ध स्कोर',
    responseReviewTitle: 'उत्तर समीक्षा एवं विस्तृत हल',
    filterAll: 'सभी',
    filterIncorrect: 'गलत',
    filterSkipped: 'छोड़े गए',
    unattemptedTag: 'अनुत्तरित (0.00)',
    correctTag: 'सही (+1.00)',
    wrongTag: (picked: string) => `गलत (−0.33) · आपका चयन: ${picked}`,

    // Answer Key & Calculator
    akKicker:
      'आधिकारिक RRB CBT अंकन योजना (+1 सही · −1/3 गलत · 0 अनुत्तरित)',
    akTitle: 'उत्तर कुंजी, नकारात्मक अंकन (−1/3) विश्लेषण व 120-मिनट रणनीति',
    akSubtitle:
      'प्रत्येक 3 गलत उत्तर 1 सही उत्तर का पूरा अंक घटा देते हैं। नीचे दिए गए कैलकुलेटर से जानें कि सटीकता आपके शुद्ध स्कोर को कैसे प्रभावित करती है।',
    simCorrectLabel: 'सही उत्तर (+1 अंक प्रति प्रश्न)',
    simWrongLabel: 'गलत उत्तर (−0.333 अंक प्रति प्रश्न)',
    questionsUnit: 'प्रश्न',
    maxLabel: 'अधिकतम',
    projectedNetScore: 'अनुमानित शुद्ध स्कोर',
    negativePenalty: 'नकारात्मक कटौती',
    marksDeducted: 'अंक कटे',
    accuracyRate: 'सटीकता दर',
    attemptedSkipped: 'प्रयास / छोड़े गए',
    workedScenariosTitle: 'नकारात्मक अंकन (−1/3) के व्यावहारिक उदाहरण',
    workedScenariosSub:
      'उच्च सटीकता वाले अनुशासित प्रयास बनाम अनुमान लगाकर अधिक प्रश्न करने की तुलना।',
    strategyTitle: '120-मिनट समय-प्रबंधन व लक्ष्य वितरण',
    strategySub:
      'अनुशंसित चरण-1 (85 मिनट) + चरण-2 समीक्षा (25 मिनट) + अंतिम जाँच (10 मिनट)।',
    masterKeyTitle: 'पूर्ण 1–100 मुख्य उत्तर कुंजी',
    masterKeySub:
      'प्रत्येक उत्तर की चरण-दर-चरण गणना और तार्किक सत्यापन के साथ पुष्टि की गई है।',
    allSections: 'सभी खंड',
    allDifficulties: 'सभी स्तर',
    colQNo: 'प्र.सं.',
    colTopic: 'विषय',
    colDifficulty: 'कठिनाई',
    colClassification: 'श्रेणी',
    colAnswer: 'उत्तर',
    colCorrectValue: 'सही विकल्प मान',

    // Formulas
    formulasKicker: 'त्वरित पुनरीक्षण संदर्भ · CEN सं. 08/2026',
    formulasTitle: 'प्रमुख सूत्र, शॉर्टकट और सामान्य परीक्षा सावधानियाँ',
    formulasSubtitle:
      'RRB स्टेशन मास्टर CBT में बार-बार पूछे जाने वाले गणितीय सूत्र, भौतिकी संबंध, DI ट्रिक्स और नकारात्मक अंकन से बचने के उपाय।',
    pitfallsTitle: 'सात प्रमुख CBT परीक्षा त्रुटियाँ और उनसे बचने के तरीके',
    pitfallLabel: 'सामान्य त्रुटि:',
    preventionLabel: 'बचाव का तरीका:',
  },
} as const;

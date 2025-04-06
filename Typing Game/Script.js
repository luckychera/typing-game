// Game variables
let timer;
let timeLeft;
let isPlaying = false;
let currentQuote = "";
let currentCharIndex = 0;
let correctKeystrokes = 0;
let totalKeystrokes = 0;
let startTime;
let quoteHistory = [];
let incorrectChars = 0;
let misspelledWords = 0;

// Time limits for each difficulty (in seconds)
const timeLimits = {
    easy: 90,    // 1.5 minutes
    medium: 60,  // 1 minute
    hard: 50     // 50 seconds
};

// DOM elements
const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const startBtn = document.getElementById('start-btn');
const finishBtn = document.getElementById('finish-btn');
const resetBtn = document.getElementById('reset-btn');
const timeDisplay = document.getElementById('time');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const difficultySelect = document.getElementById('difficulty');
const modal = document.getElementById('result-modal');
const finalWpm = document.getElementById('final-wpm');
const finalAccuracy = document.getElementById('final-accuracy');
const correctCharsDisplay = document.getElementById('correct-chars');
const incorrectCharsDisplay = document.getElementById('incorrect-chars');
const misspelledWordsDisplay = document.getElementById('misspelled-words');
const timeUsedDisplay = document.getElementById('time-used');
const closeModal = document.getElementById('close-modal');
const languageSelect = document.getElementById('language-select');
const currentYearSpan = document.getElementById('current-year');

// current year 
currentYearSpan.textContent = new Date().getFullYear();

// Language support
const translations = {
    en: {
        title: "Typing Game",
        subtitle: "Improve your typing skills!",
        time: "Time",
        wpm: "WPM",
        accuracy: "Accuracy",
        input_placeholder: "Start typing here when the game begins...",
        start_button: "Start Game",
        finish_button: "Finish",
        reset_button: "Reset",
        difficulty: "Difficulty:",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        game_over: "Game Over!",
        typing_speed: "Your typing speed:",
        correct_chars: "Correct characters:",
        incorrect_chars: "Incorrect characters:",
        misspelled_words: "Misspelled words:",
        time_used: "Time used:",
        play_again: "Play Again",
        footer_text: "©2025 School Typing Game. It Can be used for Eduactional."
    },
    om: {
        title: "Tapha Barruu jechoota",
        subtitle: "Ogummaa Barruu kee fooyyessii!",
        time: "Yeroo",
        wpm: "WPM",
        accuracy: "Sirrii ta'uu",
        input_placeholder: "Yeroo taphanni eegale barruu asii eegalu...",
        start_button: "Taphichaa Eegalu",
        finish_button: "Xumuri",
        reset_button: "Haaromsi",
        difficulty: "Cimina tapha:",
        easy: "Salphaa",
        medium: "Giddu galeessa",
        hard: "Cimaa",
        game_over: "Taphanni Xumurameera!",
        typing_speed: "Saffisa barruu kee:",
        correct_chars: "Qubee sirri:",
        incorrect_chars: "Qubee dogoggoraa:",
        misspelled_words: "Jechoota dogoggoraa:",
        time_used: "Yeroo itti fayyadamte:",
        play_again: "Irra Deebi'ii Taphadhu",
        footer_text: "©2025 Tapha Barruu jechoota. Kaayyoo Barnootaaf kan Oolu danda'u."
    },
    am: {
        title: "የታይፒንግ ጨዋታ",
        subtitle: "የቃላት ታይፒንግ ክህሎትዎን ያሻሽሉ!",
        time: "ጊዜ",
        wpm: "WPM",
        accuracy: "ትክክለኛነት",
        input_placeholder: "ጨዋታው ሲጀምር እዚህ ይጻፉ...",
        start_button: "ጨዋታ ጀምር",
        finish_button: "ጨርስ",
        reset_button: "ዳግም ጀምር",
        difficulty: "የጨዋታው ክብደት:",
        easy: "ቀላል",
        medium: "መካከለኛ",
        hard: "ከባድ",
        game_over: "ጨዋታው አልቋል!",
        typing_speed: "የታይፕ ፍጥነትዎ:",
        correct_chars: "ትክክለኛ ፊደሎች:",
        incorrect_chars: "ትክክል ያልሆኑ ፊደሎች:",
        misspelled_words: "በትክክል ያልተፃፉ ቃላት:",
        time_used: "የተጠቀመው ጊዜ:",
        play_again: "እንደገና ተጫወት",
        footer_text: "©2017 የታይፒንግ ጨዋታ. ለትምርታዊ ግብአት ሊውል የሚችል"
    },
    ti: {
        title: "ጸወታ ታይፒንግ",
        subtitle: "ናይ ምጽሓፍ ክእለትካ ምምሕያሽ!",
        time: "ግዜ",
        wpm: "WPM",
        accuracy: "ልክዕነት",
        input_placeholder:  "እቲ ጸወታ ምስ ጀመረ ኣብዚ ምጽሓፍ ጀምር..",
        start_button: "ጀምር",
        finish_button: "ወደአ",
        reset_button: "ዳግማይ ምትካል",
        difficulty: "ዲፊኩክልቲ:",
        easy: "ቀሊል",
        medium: "ማእከላይ",
        hard: "ከቢድ",
        game_over: "ጸወታ ኣብ ልዕሊ!",
        typing_speed: "ናይ ምጽሓፍ ፍጥነትካ:",
        correct_chars: "ቅኑዕ ፊደላት:",
        incorrect_chars: "ዘይተኣማመኑ ፊደላት:",
        misspelled_words: "ጌጋ ቃላት:",
        time_used: "ግዜ ዝተጠቕመሉ:",
        play_again: "ተጻወት ደጊምካ",
        footer_text: "© 2017 ናይ ቲፕ ጸወታ : ንስሩዕ ጸጋ ክትጥቀመሉ ትኽእል ኢኻ።"
    },
    so: {
        title: "Ciyaarta Tooska",
        subtitle: "Hagaajinta xirfadahaaga qorista!",
        time: "Waqti",
        WPM: "WPM",
        accuracy: "Saxsanaanta",
        input_placeholder: "Bilow inaad ku qoreyso halkaan marka ciyaartu bilaabato ...",
        Start_button: "Ku bilow ciyaarta",
        finish_button: "Dhameystir",
        reset_button: "Dib-u-dejin",
        difficulty: "Dhibaatada:",
        easy: "Fududahay",
        medium: "Dhex-dhexaad",
        hard: "Fdag",
        game_over: "Ciyaarta ka badan!",
        typing_speed: "FXawaarahaaga ku qoran:",
        correct_chars: "Xadgudubka saxda ah:",
        incorrect_chars: "Xarfaha qaldan:",
        misspelledWords: "Erayada la waayey:",
        time_used: "Waqti loo adeegsaday:",
        play_again: "Ciyaar mar labaad",
        footer_text: "© 2025 ciyaarta qoritaanka dugsiga. Waxaa loo isticmaali karaa Waxabarasho."
    }
};

// Quotes database
const quotes = {
    en: {
        easy: [
            "The quick brown fox jumps over the lazy dog.",
            "Learning to code is fun and rewarding.",
            "Practice makes perfect in all things.",
            "Every journey begins with a single step.",
            "School is where we learn and grow together.",
            "Reading books opens new worlds for us.",
            "The sun gives us light and warmth every day.",
            "Friends help each other in good times and bad.",
            "Knowledge is power when shared with others.",
            "Computers help us solve many problems.",
            "Typing fast helps with school work.",
            "Education is the key to success in life.",
            "In a quaint little town there is a young boy named Lucky"
        ],
        medium: [
            "The only way to learn a new programming language is by writing programs in it.",
            "Computer science is no more about computers than astronomy is about telescopes.",
            "The function of good software is to make the complex appear to be simple.",
            "Programs must be written for people to read, and only incidentally for machines to execute.",
            "The best error message is the one that never shows up.",
            "Debugging is twice as hard as writing the code in the first place.",
            "Simplicity is the soul of efficiency.",
            "The most disastrous thing that you can ever learn is your first programming language.",
            "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
            "The computer was born to solve problems that did not exist before.",
            "Good code is its own best documentation."
        ],
        hard: [
            "The art of programming is the skill of controlling complexity.",
            "There are two ways of constructing a software design.",
            "The competent programmer is fully aware of the strictly limited size of his own skull.",
            "Good programming is not learned from generalities, but by seeing how significant programs can be made clean, easy to read, easy to maintain and modify, human-engineered, efficient, and reliable.",
            "The most important property of a program is whether it accomplishes the intention of its user.",
            "Controlling complexity is the essence of computer programming.",
            "The best way to predict the future is to implement it.",
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            "First, solve the problem. Then, write the code.",
            "Programming is the art of telling another human what one wants the computer to do.",
            "The proper use of comments is to compensate for our failure to express ourself in code.",
            "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."
        ]
    },
    om: {
        easy: [
            "Saala saffisaa bunni saree dadhaboo irra utaala.",
            "Koodii barachuun nama gammachiisaa fi nama badhaasudha.",
            "Shaakala waan hundumaa keessatti mudaa hin qabne godha.",
            "Imala hunda tarkaanfii tokkoon jalqaba.",
            "Manni barumsaa bakka itti barannuu fi itti guddannudha.",
            "Kitaabota dubbisuun addunyaa haaraa nuuf bana.",
            "Aduun guyyaa guyyaan ifaafi ho'a nuuf kenniti.",
            "Hiriyyoonni yeroo gaarii fi hamaa keessatti wal gargaaru.",
            "Beekumsi humna yeroo namoota biroof qoodamudha.",
            "Kompiitaroonni rakkoo hedduu furuuf nu gargaaru.",
            "Saffisaan hojii mana barumsaa gargaara.",
            "Barnoonni jireenya keessatti milkaa'inaaf furtuudha.",
            "Magaalaa "
        ],
        medium: [
            "Afaan sagantaa haaraa barachuuf karaan jiru sagantaa itti barreessuu qofa.",
            "Saayinsiin kompiitaraa waa'ee kompiitaraa hin ta'u astroonomiin waa'ee teleskooppiiti.",
            "Hojiin sooftiweerii gaarii walxaxaa ta'ee akka mul'atu gochuudha.",
            "Sagantaan namoonni akka dubbisaniif barreeffamuu qaba, akka tasaattis maashiniiwwan akka raawwataniif qofa.",
            "Ergaa dogongoraa hundarra gaariin kan gonkumaa hin mul'annedha.",
            "Debugging jalqaba irratti koodii barreessuu caalaa dachaa lama ta'a.",
            "Salphaa ta'uun lubbuu gahumsaati.",
            "Wanti balaa guddaa qabu kan ati barachuu dandeessu afaan sagantaa kee isa jalqabaati.",
            "Adeemsa sagantaa safaruun sarara koodiitiin akka guddina gamoo xiyyaaraa ulfaatinaan safaruuti.",
            "Kompiitarri rakkoo duraan hin jirre furuuf dhalate.",
            "Koodiin gaariin dokumentii mataa isaa isa gaarii dha."
        ],
        hard: [
            "Ogummaan sagantaa ogummaa walxaxummaa to'achuudha.",
            "Diizaayinii sooftiweerii ijaaruuf karaan lama jira.",
            "Sagantaan gahumsa qabu kun guddina cimaa mataa isaa guutummaatti beeka.",
            "Sagantaan gaariin waliigalaa irraa kan baratamu osoo hin taane, sagantaaleen barbaachisoo ta'an akkamitti qulqullina, salphaatti dubbisuuf, kunuunsuu fi fooyyessuuf salphaa ta'uu danda'u, namaan kan hojjetu, ga'umsa qabuu fi amanamaa ta'uu isaa ilaaluudhaan.",
            "Qabeenyi sagantaa tokkoo inni guddaan yaada fayyadamaa isaa galmaan gahuu fi dhiisuu isaati.",
            "Qopheessaa to'achuun hundee sagantaa kompiitaraati.",
            "Karaan hundarra gaariin gara fuula duraatti tilmaamuuf hojiirra oolchuudha.",
            "Gowwaa kamiyyuu koodii kompiitara hubachuu danda'u barreessuu danda'a. Sagantaawwan gaariin koodii ilmaan namaa hubachuu danda'an barreessu.",
            "Jalqaba, rakkoo furi. Sana booda, koodii barreessi.",
            "Sagantaan aartii nama biraatti himuudha, namni tokko maal akka hojjetu barbaada.",
            "Yaada sirnaan itti fayyadamuun koodii keessatti of ibsuu dhabuu keenyaaf beenyaa kaffaluudha.",
            "Yeroo hunda akka waan gurbaan koodii kee eeguun dhumutti nama eessa akka jiraattu beeku ta'a."
        ]
    },
    am: {
        easy: [
            "ፈጣን ቡናማ ቀበሮ ሰነፍ ውሻውን ይዘጋል",
            "ኮድ መማር አስደሳችና አርኪ ነው",
            "ልምምድ በሁሉም ነገር ፍጹም ያደርጋል",
            "እያንዳንዱ ጉዞ በአንድ እርምጃ ይጀምራል",
            "ትምህርት ቤት የምንማርበት እና አብረን የምናድግበት ቦታ ነው",
            "መጽሐፍት በማንበብ አዳዲስ ዓለቶችን ይከፍላቸዋል",
            "ፀሐይ በየቀኑ ብርሃን ይሰጠናል",
            "ጓደኞች በጥሩ እና በመጥፎዎች እርስ በእርስ የሚተዉ እርስ በርሳችሁ ተዋረዱ",
            "ዕውቀት ለሌሎች ሲጋራ ኃይል ነው",
            "ኮምፒተሮች ብዙ ችግሮችን እንድንፈታ ይረዳናል",
            "በፍጥነት በት/ቤት ሥራ መሥራት ይረዳል",
            "በሕይወት ውስጥ ለስኬት ቁልፉ ትምህርት ነው",
            "በአንድ ትንሽ ጠማማ ከተማ ውስጥ ዕድል የሚባል ወጣት ልጅ አለ"
        ],
        medium: [
            "አዲስ የፕሮግራም ቋንቋ ለመማር ብቸኛው መንገድ በውስጡ ፕሮግራሞችን በመጽፌ ነው",
            "የሥነ ፈለክ ጥናት ከዚህ የበለጠ ስለ ቴሌስኮፖች የሚሆኑ ናቸው",
            "የመልካም ሶፍትዌር ተግባር ውስብስብ ሆኖ እንዲታይ ለማድረግ ነው",
            "ፕሮግራሞች ሰዎች እንዲያነቡ እና በአጋጣሚ ለመፈፀም በመደናቀፍ ብቻ የተጻፉ ፕሮግራሞች ብቻ መፃፍ አለባቸው",
            "በጣም ጥሩው የስህተት መልእክት በጭራሽ የማይታይ ሰው ነው",
            "በመጀመሪያው ቦታ ኮዱን ለመፃፍ ሁለት እጥፍ ያህል ጠንክሮ እጥፍ ነው",
            "ቀሊልነት የቅመም ስጋ ነፍስ ናት",
            "ሊማሩበት የሚችሉት በጣም አስከፊ ነገር የመጀመሪያ የፕሮግራም ቋንቋዎ ነው",
            "በኮድ መስመሮች የፕሮግራም ልማት መለካት እንደ አውሮፕላን የግንባታ ልማት በክብደት የመለኪያ አካባቢ ነው.",
            "ከዚህ በፊት ያልነበሩ ችግሮችን ለመፍታት ኮምፒተርው ተወለደ",
            "ጥሩ ኮድ የራሱ ምርጥ ሰነድ ነው"
        ],
        hard: [
            "የፕሮግራም አወጣጥ ስነጥበብ ውስብስብነትን የመቆጣጠር ችሎታ ነው::",
            "የሶፍትዌር ዲዛይን የመገንባት ሁለት መንገዶች አሉ::",
            "ብቃት ያለው የፕሮግራም ፕሮግራሙ የተዘበራረቀውን የራሱን የራስ ቅል ሙሉ በሙሉ ያውቀዋል.",
            "ጥሩ የፕሮግራም አወጣጥ ከንብረት አልተማረ, ለማንበብ ቀላል, ለማንበብ ቀላል, እና እምነት የሚጣልበት, ለማሻሻል እና ለማስተናገድ ቀላል እንዴት እንደሚኖር በመመልከት",
            "የፕሮግራም በጣም አስፈላጊ ንብረት የተጠቃሚውን ዓላማ ያጠናክራል የሚለው ነው::",
            "ውስብስብነት መቆጣጠር የኮምፒተር ፕሮግራም ዋና ይዘት ነው::",
            "የወደፊቱን ለመተንበይ ከሁሉ የተሻለው መንገድ መተግበር ነው::",
            "ማንኛውም ሞኝ ኮምፒተር ሊረዳው የሚችለውን ኮድ ሊጽፍ ይችላሉ ጥሩ ፕሮግራሞች ሰዎች ሊረዱት በሚችሉት ኮድ ይጻፋሉ::",
            "መጀመሪያ ችግሩን ይፍቱ ከዚያ ኮዱን ይፃፉ::",
            "መርሃግብሩ አንድ ሰው ኮምፒተር ምን እንደሚያደርግ የሚፈልገውን ሌላ ሰው የመናገር ጥበብ ነው::",
            "በአግባቡ አስተያየቶች መጠቀም እራሳችንን በኮድ ለመግለፅ ውድቀታችንን ለማካካስ ነው::",
            "ኮድዎን የሚያጠናቅቅ ሰው እርስዎ የሚኖሩበትን ቦታ የት እንደሚያውቅ የሚያውቅ የአስቂኝ የስነ-ልቦና መጠን ያለው ይሆናል::"
        ]
    },
    ti: {
        easy: [
            "እቲ ቅልጡፍ ቡናዊ ሓርገጽ ኣብ ልዕሊ እቲ ሰነፍ ከልቢ ይዘልል",
            "ንኮድ ምምሃር ዘዘናግዕን ዓስቢ ዘለዎን እዩ",
            "ልምምድ ኣብ ኩሉ ፍጹም ይገብር",
            "ነፍሲ ወከፍ ጉዕዞ ብሓደ ስጉምቲ እዩ ዝጅምር",
            "ቤት ትምህርቲ ብሓባር እንመሃሮን እንዓብየሉን እዩ",
            "መጽሓፍቲ ምንባብ ሓደስቲ ዓለማት ይኸፍተልና",
            "ጸሓይ መዓልታዊ ቀሊልን ውዑይን ትህበና",
            "መሓዙት ኣብ ጽቡቕ ግዜን ሕማቕን ንሓድሕዶም ይተሓጋገዙ",
            "ፍልጠት ምስ ካልኦት ክካፈል ከሎ ስልጣን እዩ",
            "ኮምፒተርስ ብዙሕ ጸገማት ንምፍታሕ ይሕግዙና",
            "ቅልጡፍ ምጽሓፍ ኣብ ስራሕ ቤት ትምህርቲ ይሕግዝ",
            "ትምህርቲ ኣብ ህይወት ቁልፊ ዓወት እዩ",
            "ኣብ ንእሽቶ ንእሽቶ ከተማ ዕድለኛ ዝበሃል መንእሰይ ወዲ ኣሎ"
        ],
        medium: [
            "ሓድሽ ፕሮግራሚንግ ቋንቋ ክትመሃረሉ እትኽእል እንኮ መገዲ፡ ኣብኡ መደባት ብምጽሓፍ እዩ።",
            "ኮምፒተር ሳይንስ ካብ ስነ-ፍልጠት ከዋኽብቲ ብዛዕባ ቴለስኮፕ ካብ ዝኾነ ንላዕሊ ብዛዕባ ኮምፒዩተር ኣይኮነን።",
            "ናይ ጽቡቕ ሶፍትዌር ተግባር፡ ነቲ ኮምፕሌክስ ቀሊል ክመስል ምግባር'ዩ።",
            "ንሰባት ንኸንብቡ መደባት ክጽሓፉ ኣለዎም፡ ከምኡ'ውን ንኣጋጣሚ ዝኸውን ማሽናት ንኽፍጽሙ ጥራይ'ዩ።",
            "እቲ ዝበለጸ ናይ ጌጋ መልእኽቲ እቲ ፈጺሙ ዘይርአ እዩ።",
            "ዲባጊንግ ካብቲ ብመጀመርታ ነቲ ኮድ ምጽሓፍ ብዕጽፊ ዝኸበደ እዩ።",
            "ቀሊልነት ነፍሲ ናይ ብቕዓት እያ።",
            "እቲ ክትመሃሮ እትኽእል ኣዝዩ ኣዕናዊ ነገር፡ ናይ መጀመርታ ናይ ፕሮግራሚንግ ቋንቋኻ እዩ።",
            "መደባት ፕሮግራሚንግ ብመስመር ኮድ ምዕቃን ልክዕ ከምቲ ብክብደት ንህንጻ ነፈርቲ ዝግበር ምዕባለ ምዕቃን እዩ።",
            "ኮምፒተር ቅድሚ ሕጂ ዘይነበረ ጸገማት ንምፍታሕ እያ ተወሊዳ።",
            "ጽቡቕ ኮድ ናይ ገዛእ ርእሱ ዝበለጸ ሰነድ'ዩ።"
        ],
        hard: [
            "ስነ-ጥበብ ፕሮግራሚንግ ዝተሓላለኸነት ናይ ምቁጽጻር ክእለት እዩ።",
            "ክልተ መገድታት ንምህናጽ ሶፍትዌር ዲዛይን ኣሎ።",
            "እቲ ብቑዕ ፕሮግራመር ብዛዕባ እቲ ብጥብቂ ውሱን ስፍሓት ናይ ገዛእ ርእሱ ርእሲ ምራኽ ምሉእ ብምሉእ ይፈልጦ እዩ።",
            "ጽቡቕ ፕሮግራሚንግ ካብ ሓፈሻዊ ነገራት ዘይኮነስ፡ ክሳብ ክንደይ ትርጉም ዘለዎም ፕሮግራማት ጽሩይ፡ ንምንባብ ቀሊል፡ ንምዕቃብ ቀሊልን ንምቕያርን ቀሊል፡ ንሰብ ዝሃንጽ፡ ስሉጥን ዘተኣማምንን ክግበር ከም ዝኽእል ብምርኣይ።",
            "እቲ ኣገዳሲ ንብረት ናይ ሓደ መደብ፡ ዕላማ ተጠቃሚኡ ይፍጽም ድዩ ኣይፍጽምን እዩ።",
            "ምቁጽጻር ዝተሓላለኸነት ሕመረት ናይ ኮምፒተር ፕሮግራሚንግ እዩ።",
            "እቲ ዝበለጸ መንገዲ ንመጻኢ ንምግማት ምግባር'ዩ።",
            "ዝኾነ ዓሻ ኮምፒተር ክርድኦ ዝኽእል ኮድ ክጽሕፍ ይኽእል እዩ። ንፉዓት ፕሮግራመርስ ደቂ ሰባት ክርድእዎ ዝኽእሉ ኮድ ይጽሕፉ።",
            "መጀመርታ፡ ነቲ ጸገም ፍታሕ። ድሕሪኡ፡ ነቲ ኮድ ጽሓፎ።",
            "ፕሮግራሚንግ ንኻልእ ሰብ ኮምፒተር እንታይ ክትገብር ከም እትደሊ ምዝንታው ስነ-ጥበብ እዩ።",
            "ግቡእ ኣጠቓቕማ ርእይቶታት ነቲ ብኮድ ርእስና ምግላጽ ዘይምኽኣልና ንምኽሓስ እዩ።",
            "ኩሉ ግዜ እቲ ኮድካ ዝሕሉ ወዲ ኣበይ ከም እትነብር ዝፈልጥ ዓመጽ ዝመልኦ ስነ-ኣእምሮኣዊ ጸገም ክኸውን እዩ።",
        ]
    },
    so: {
        easy: [
            "Dawacadaha degdega ah ee bunni wuxuu ku boodaa eeyga caajiska ah.",
            "Barashada koodhku waa madadaalo oo abaal marin leh.",
            "Ku celcelintu wax walba way ku qumman tahay.",
            "Safar kasta wuxuu ku bilaabmaa hal talaabo.",
            "Iskuulku waa meesha aan wax ka barano oo aan ku koraan.",
            "Akhrinta buugaagta waxay noo furataa adduunyo cusub.",
            "Qorraxdu waxay na siisaa iftiin iyo kuleyl maalin kasta.",
            "Saaxiibbadu waxay iscaawiyaan midba midka kale wakhtiyo wanaagsan iyo xumaan.",
            "Aqoontu waa awood markii lala wadaago kuwa kale.",
            "Kombiyuutaro ayaa naga caawiya xallinta dhibaatooyin badan.",
            "Xusaha soonka waxay ka caawisaa shaqada iskuulka.",
            "Waxbarashadu waa furaha guusha nolosha.",
            "Magac yar oo yar oo ka yar Waxaa jira wiil dhalinyaro ah oo la yiraahdo Nasiib."
        ],
        medium: [
            "Sida kaliya ee lagu baran karo luqadda barnaamijyada cusub waa barnaamijyo qoraal ah oo ku jira. ",
            "Sayniska kombiyuutarka mar dambe kuma saabsana kombiyuutarada marka loo eego cilmiga xiddigiska waa ku saabsan telescopes.",
            "Shaqada softiweerka wanaagsan waa in dhismaha laga dhigo mid fudud.",
            "Barnaamijyada waa in loo qoraa dadka ay wax ku akhriyaan, oo ay si lama filaan ah ugu dhacdo mashiinnada la dilo.",
            "Farriinta khaladaadka ugu fiican waa midka aan waligood soo bandhigin.",
            "Dibedda 'laba jibaar' laba jibaar bay ku adag tahay sida qorista koodhka meesha ugu horeysa.",
            "Fududayntu waa nafta hufnaanta.",
            "Waxa ugu musiibada ee aad waligaa baran karto waa luqaddaada barnaamijyada ugu horreeya.",
            "Cabbirida horumarka barnaamijyada ee khadadka koodhku waa sida cabbiraadda diyaaradaha dhismaha ee miisaanka miisaanka.",
            "Kombiyuutarka wuxuu ku dhashay inuu xalliyo dhibaatooyinka aan horay u jirin.",,
            "Xeerka wanaagsan waa dukumiinti u gaar ah."
        ],
        hard: [
            "Farshaxanka barnaamijku waa xirfadda xakameynta kakanaanta.",
            "Waxaa jira laba dariiqo oo lagu dhisayo qaabeynta software.",
            "Barnaamijyada kartida leh ayaa si buuxda uga warqabka cabirrada xadidan ee qalfoofkiisa.",
            "Barnaamij wanaagsan laga baro dadka ka socda guud ahaan, laakiin markay arkeen sida barnaamijyada muhiimka ah loo nadiifin karo, way fududahay in la ilaaliyo oo wax laga beddelo, injineernimada, iyo injineerinka aadanaha, iyo la isku halleyn karo.",
            "Hantida ugu muhiimsan ee barnaamijku waa haddii ay fulinayso ujeeddada isticmaaleheeda.",
            "Kakanaanta xakamaynta ayaa ah nuxurka barnaamij kombiyuutarka.",
            "Sida ugu wanaagsan ee loo saadaalin karo mustaqbalku waa in la hirgaliyo.",
            "Wax kasta oo nacas ah ayaa qori kara koodh ah in kombuyuutar uu fahmi karo. Barnaamijyada wanaagsan ee barnaamijyada ayaa qoraan koodh ay dadku fahmi karaan.",
            "Marka hore, xalli dhibaatada. Kadib, qor koodhka.",
            "Barnaamijyada waa farshaxanka u sheegaya bini aadam kale waxa uu qofku doonayo kombiyuutarka inuu sameeyo.",
            "Isticmaalka saxda ah ee faallooyinka waa in lagu magdhabo guuldaradii aan u soo bandhigi laheyn nambar naga.",
            "Had iyo jeer lambar ahaan sida ninka ku dhamaaday inuu ilaaliyo koodhkaagu wuxuu noqon doonaa mid rabshad badan oo kacsan oo garanaya meesha aad ku nooshahay."
        ]
    }
};

let currentLanguage = 'en';

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });
    
    document.querySelectorAll('option[data-i18n]').forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (translations[lang][key]) {
            option.textContent = translations[lang][key];
        }
    });
}



// Get a new random quote
function getNewQuote(difficulty) {
    const quoteList = quotes[currentLanguage][difficulty];
    return quoteList[Math.floor(Math.random() * quoteList.length)];
}

// Calculate misspelled words
function calculateMisspelledWords(inputText, quote) {
    const inputWords = inputText.trim().split(/\s+/);
    const quoteWords = quote.trim().split(/\s+/);
    let errors = 0;
    
    for (let i = 0; i < Math.min(inputWords.length, quoteWords.length); i++) {
        if (inputWords[i] !== quoteWords[i]) {
            errors++;
        }
    }
    
    errors += Math.abs(inputWords.length - quoteWords.length);
    return errors;
}

// Initialize the game
function init() {
    languageSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
        resetGame();
    });
    
    startBtn.addEventListener('click', startGame);
    finishBtn.addEventListener('click', finishGame);
    resetBtn.addEventListener('click', resetGame);
    quoteInput.addEventListener('input', checkInput);
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        resetGame();
    });
    
    changeLanguage(currentLanguage);
}

// Start the game
function startGame() {
    if (isPlaying) return;
    
    isPlaying = true;
    const difficulty = difficultySelect.value;
    timeLeft = timeLimits[difficulty];
    currentCharIndex = 0;
    correctKeystrokes = 0;
    totalKeystrokes = 0;
    incorrectChars = 0;
    misspelledWords = 0;
    
    currentQuote = getNewQuote(difficulty);
    displayQuote();
    
    quoteInput.disabled = false;
    quoteInput.value = '';
    quoteInput.focus();
    
    startBtn.disabled = true;
    finishBtn.disabled = false;
    resetBtn.disabled = false;
    difficultySelect.disabled = true;
    languageSelect.disabled = true;
    timeDisplay.textContent = timeLeft;
    
    startTime = Date.now();
    timer = setInterval(updateTimer, 1000);
    
    updateStats();
}

// Display the current quote with highlighting
function displayQuote() {
    let html = '';
    
    currentQuote.split('').forEach((char, index) => {
        let charClass = '';
        
        if (index < currentCharIndex) {
            charClass = 'correct';
        } else if (index === currentCharIndex) {
            charClass = 'current';
        }
        
        html += `<span class="${charClass}">${char}</span>`;
    });
    
    quoteDisplay.innerHTML = html;
}

// Checking user input against the quote
function checkInput() {
    const inputText = quoteInput.value;
    const currentInputChar = inputText[currentCharIndex] || '';
    const currentQuoteChar = currentQuote[currentCharIndex];
    
    totalKeystrokes++;
    
    if (currentInputChar === currentQuoteChar) {
        currentCharIndex++;
        correctKeystrokes++;
    } else {
        incorrectChars++;
    }
    
    displayQuote();
    
    if (currentCharIndex === currentQuote.length) {
        finishGame();
    }
    
    updateStats();
}

// Update the timer and stats
function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        finishGame();
    }
}

// Update WPM and accuracy
function updateStats() {
    const elapsedTimeInMinutes = ((Date.now() - startTime) / 1000 / 60) || 0.0167; // Minimum 1 second
    
    // WPM calculation: (correct characters / 5) / minutes
    const wpm = Math.round((correctKeystrokes / 5) / elapsedTimeInMinutes);
    wpmDisplay.textContent = wpm;
    
    // Accuracy calculation
    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 0;
    accuracyDisplay.textContent = `${accuracy}%`;
}

// Finish the game and show results
function finishGame() {
    clearInterval(timer);
    isPlaying = false;
    quoteInput.disabled = true;

    // Calculate time used
    const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
    const elapsedTimeInMinutes = elapsedTimeInSeconds / 60;
    
    // Calculate misspelled words
    const inputText = quoteInput.value;
    misspelledWords = calculateMisspelledWords(inputText, currentQuote);
    
    // Calculate final stats
    const wpm = Math.round((correctKeystrokes / 5) / elapsedTimeInMinutes);
    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 0;
    
    // Update results display
    finalWpm.textContent = wpm;
    finalAccuracy.textContent = accuracy;
    correctCharsDisplay.textContent = correctKeystrokes;
    incorrectCharsDisplay.textContent = incorrectChars;
    misspelledWordsDisplay.textContent = misspelledWords;
    timeUsedDisplay.textContent = elapsedTimeInSeconds;
    
    // Show modal with results
    modal.style.display = 'flex';
    
    // Add animation to results
    animateResults();
}

// Animate results display
function animateResults() {
    const resultRows = document.querySelectorAll('.result-row');
    resultRows.forEach((row, index) => {
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Reset the game
function resetGame() {
    clearInterval(timer);
    isPlaying = false;
    
    quoteDisplay.innerHTML = translations[currentLanguage]['input_placeholder'];
    quoteInput.value = '';
    quoteInput.disabled = true;
    timeDisplay.textContent = timeLimits[difficultySelect.value];
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '0%';
    
    startBtn.disabled = false;
    finishBtn.disabled = true;
    resetBtn.disabled = true;
    difficultySelect.disabled = false;
    languageSelect.disabled = false;
}

// Initialize the game when the page loads
window.onload = init;
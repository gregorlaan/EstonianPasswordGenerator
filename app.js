// Run if page is loaded
document.addEventListener('DOMContentLoaded', function(){ 

  // App selector
  var app = document.querySelector("#app");

  // Generated password selector
  var password = document.querySelector(".password span");
  
  // Password title selector
  var title = document.querySelector(".title span");

  // Random number fron 0 to 49
  function getRandomInt () {
    return Math.floor(Math.random() * 50);
  }

  // Declare variables
  var pw;
  var adjective;
  var noun;
  var verb;
  var adjectiveRaw;
  var nounRaw;
  var verbRaw;

  // Add span for each character
  function addSpan(word) {
    var wordLength = word.length;
    var current = "";
    for (var character = 0; character < wordLength; character++) {
      current += "<span>" + word[character] + "</span>";
    }
    return current;
  }

  // Generate password
  var generatePassword;
  generatePassword = function () {
    console.log("start");
    // Get an adjective
    var firstRand = getRandomInt();
    adjective = adjectives[firstRand];
    adjective = addSpan(adjective);
    adjectiveRaw = adjectives[firstRand];

    // Get a noun
    var secondRand = getRandomInt();
    noun = nouns[secondRand];
    noun = addSpan(noun);    
    nounRaw = nouns[secondRand];

    // Get a verb
    var thirdRand = getRandomInt();    
    verb = verbs[thirdRand];
    verb = addSpan(verb);    
    verbRaw = verbs[thirdRand];

    // Combine a password from three words
    pw = adjective + noun + verb;
    updatePw();
  };

  // Execure password generator
  generatePassword();

  // Capitalize a word or not
  document.querySelector('#useCapitals').onchange = function() {
    runUseCapitals();
  };

  function runUseCapitals() {
    if (document.querySelector('#useCapitals:checked')) {
      adjective = adjective.slice(0,6) + adjective.charAt(6).toUpperCase() + adjective.slice(7);
      noun = noun.slice(0,6) + noun.charAt(6).toUpperCase() + noun.slice(7);
      verb = verb.slice(0,6) + verb.charAt(6).toUpperCase() + verb.slice(7);
      pw = adjective + noun + verb;
      updatePw();
    } else if (document.querySelector('#useCapitals:not(:checked)')) {
      adjective = adjective.slice(0,6) + adjective.charAt(6).toLowerCase() + adjective.slice(7);
      noun = noun.slice(0,6) + noun.charAt(6).toLowerCase() + noun.slice(7);
      verb = verb.slice(0,6) + verb.charAt(6).toLowerCase() + verb.slice(7);
      pw = adjective + noun + verb;
      updatePw();
    }
  } 

  // Select symbol
  var selectSymbol = document.querySelectorAll('td');
  for (var i = 0; i < selectSymbol.length; i++) {
    selectSymbol[i].addEventListener('click', function(event) {
      var current = this;
      current.classList.toggle("active");
      var character = current.querySelector('span:nth-child(1)').innerHTML;
      var symbol = current.querySelector('span:nth-child(2)').innerHTML;
      if (current.classList[0]) {
        addSymbols(character, symbol);
      } else {
        removeSymbols(character, symbol);
      }
    });
  }

  function addSymbols(character, symbol) {
    character = "<span>" + character + "</span>";
    symbol = "<span>" + symbol + "</span>";
    adjective = adjective.replace(new RegExp(character, 'g'), symbol);
    noun = noun.replace(new RegExp(character, 'g'), symbol);
    verb = verb.replace(new RegExp(character, 'g'), symbol);
    runUseCapitals();
    updatePw();
  }

  function removeSymbols(character, symbol) {
    character = "<span>" + character + "</span>";
    symbol = "<span>" + symbol + "</span>";
    adjective = adjective.replace(new RegExp(symbol, 'g'), character);
    noun = noun.replace(new RegExp(symbol, 'g'), character);
    verb = verb.replace(new RegExp(symbol, 'g'), character);
    runUseCapitals();
    updatePw(); 
  }

  // Update password
  var updatePassword = document.querySelectorAll('.updatePassword');
  for (var i = 0; i < updatePassword.length; i++) {
    updatePassword[i].addEventListener('click', function(event) {
      updatePw();
    });
  }

  function updatePw() {
    console.log("update");
    // Output password
    pw = adjective + noun + verb;
    password.innerHTML = pw;
    // Output password title
    title.innerHTML = adjectiveRaw + " " + nounRaw + " " + verbRaw;
    // Password animation
    password.classList.remove('write-animation');
    password.style.animation = 'none';
    password.offsetHeight; /* trigger reflow */
    password.style.animation = null; 
    password.classList.add('write-animation');  
  }


  // Generate new password
  document.querySelector('#new').onclick = function() {
    runNewPassword();
  };

  function runNewPassword() {
    generatePassword();
    document.getElementById("useCapitals").checked = false;
    resetSymbols();
  }

  // Reset password
  document.querySelector('#reset').onclick = function() {
    resetPassword();
  };

  function resetPassword() {
    document.getElementById("useCapitals").checked = false;
    runUseCapitals();
    resetSymbols()
  }

  function resetSymbols() {
    for (var i = 0; i < selectSymbol.length; i++) {
      selectSymbol[i].classList.remove("active");
    }
    pw = adjectiveRaw + nounRaw + verbRaw;
    password.innerHTML = pw;
  }

}, false);

const questions = [
    {
      question: "Qual o primeiro console de videogame lançado pela Sony?",
      choices: ["PlayStation", "Xbox", "Nintendo 64", "Sega Genesis"],
      answer: "PlayStation",
    },
    {
      question:
        "Qual franquia de jogos é conhecida por seu protagonista, um encanador chamado Mario?",
      choices: [
        "Final Fantasy",
        "The Legend of Zelda",
        "Mario Kart",
        "Super Mario",
      ],
      answer: "Super Mario",
    },
    {
      question: "Qual o jogo que popularizou o gênero Battle Royale?",
      choices: [
        "Fortnite",
        "Apex Legends",
        "PlayerUnknown's Battlegrounds (PUBG)",
        "Call of Duty: Warzone",
      ],
      answer: "PlayerUnknown's Battlegrounds (PUBG)",
    },
    {
      question:
        "Em qual GTA os jogadores controlam três protagonistas ao longo da narrativa?",
      choices: [
        "Grand Theft Auto: San Andreas",
        "Grand Theft Auto IV",
        "Grand Theft Auto V",
        "Grand Theft Auto: Vice City",
      ],
      answer: "Grand Theft Auto V",
    },
    {
      question: "Em que ano foi lançado o primeiro console Xbox pela Microsoft?",
      choices: ["2000", "2001", "2002", "2003"],
      answer: "2001",
    },
    {
      question: "Qual é o nome do protagonista da série de jogos God of War?",
      choices: ["Kratos", "Ares", "Zeus", "Hercules"],
      answer: "Kratos",
    },
    {
      question:
        "Qual jogo é conhecido por sua construção de mundos, como réplicas de cidades?",
      choices: ["Minecraft", "Terraria", "Roblox", "The Sims"],
      answer: "Minecraft",
    },
    {
      question:
        "Qual o nome do jogo em que se controla o caçador de monstros Geralt de Rívia?",
      choices: [
        "The Elder Scrolls V: Skyrim",
        "Dragon Age: Inquisition",
        "Dark Souls III",
        "The Witcher 3: Wild Hunt",
      ],
      answer: "The Witcher 3: Wild Hunt",
    },
    {
      question:
        "Em Grand Theft Auto: Vice City, qual década serve como pano de fundo para o jogo?",
      choices: ["Anos 80", "Anos 90", "Anos 2000", "Anos 70"],
      answer: "Anos 80",
    },
    {
      question:
        "Em que ano foi lançado o primeiro jogo da série Assassin's Creed?",
      choices: ["2005", "2007", "2009", "2011"],
      answer: "2007",
    },
  ];
  
  const questionElement = document.querySelector("#questao");
  const nextBtn = document.querySelector("#proxima");
  const choiceElements = document.querySelectorAll(".opcao");
  const scoreElement = document.querySelector("#pontuacao");
  const mistakesElement = document.querySelector("#erros");
  
  let score = 0;
  let wrong = 0;
  let currentQuestion = 0;
  let answerChosen = false; // Para saber se a pergunta já foi respondida
  
  // Carregar as perguntas
  function loadQuestion() {
    const currentQuestionData = questions[currentQuestion];
    questionElement.innerText = currentQuestionData.question;
  
    const choices = shuffleArray(currentQuestionData.choices);
  
    for (let i = 0; i < choiceElements.length; i++) {
      choiceElements[i].innerText = choices[i];
      if (choices[i] === currentQuestionData.answer) {
        opcaoCorreta = choiceElements[i];
      }
      choiceElements[i].style.backgroundColor = "";
      choiceElements[i].style.color = "";
    }
    answerChosen = false;
  }
  
  // Embaralhar as respostas
  function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  // Verificar a resposta correta/errada
  function chooseAnswer(e) {
    if (answerChosen) {
      return;
    }
    answerChosen = true;
  
    if (e.target.innerText === questions[currentQuestion].answer) {
      score++;
      scoreElement.innerText = "Pontuação: " + score;
      e.target.style.backgroundColor = "green";
      e.target.style.color = "#fff";
    } else {
      wrong++;
      mistakesElement.innerText = "Erros: " + wrong;
      e.target.style.backgroundColor = "red";
      e.target.style.color = "#fff";
  
      setTimeout(() => {
        if (opcaoCorreta) {
          opcaoCorreta.style.backgroundColor = "green";
          opcaoCorreta.style.color = "#fff";
        }
      }, 700);
    }
  }
  
  // Adicionar o evento nas opções
  choiceElements.forEach((btn) => {
    btn.addEventListener("click", chooseAnswer);
  });
  
  // Avançar nas perguntas
  nextBtn.addEventListener("click", () => {
    if (!answerChosen) {
      alert("Responda a pergunta antes de seguir!");
      return;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      alert(
        "Fim de Jogo! \nRespostas Certas: " +
          score +
          " \nRespostas Erradas: " +
          wrong
      );
      restartQuiz();
    }
  });
  
  // Reiniciar o quiz
  function restartQuiz() {
    wrong = 0;
    score = 0;
    currentQuestion = 0;
    mistakesElement.innerText = "Erros: 0";
    scoreElement.innerText = "Pontuação: 0";
    loadQuestion();
  }
  
  loadQuestion();
  
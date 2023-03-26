require("dotenv").config();

function setSentence(sentence) {
  const sentencePlaceholder = document.getElementById("sentence-placeholder");
  sentencePlaceholder.textContent = sentence;
}

function generateSentence() {
  axios
    .get(`http://localhost:3300/sentence`)
    .then((response) => {
      const sentence = response.data;
      setSentence(sentence);
    })
    .catch((error) => {
      console.error(error);
      setSentence("Error loading sentence");
    });
}

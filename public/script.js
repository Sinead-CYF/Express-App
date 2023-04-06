function setSentence(sentence) {
  const sentencePlaceholder = document.getElementById("sentence-placeholder");
  sentencePlaceholder.textContent = sentence;
}

async function generateSentence() {
  try {
    const response = await axios.get("/sentence");
    const sentence = response.data;
    setSentence(sentence);
  } catch (error) {
    console.error(error);
    setSentence("Error loading sentence");
  }
}

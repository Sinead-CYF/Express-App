function generateSentence() {
    const sentencePlaceholder = document.getElementById("sentence-placeholder");
  
    axios.get("http://localhost:3300/sentence")
      .then(response => {
        const sentence = response.data;
        sentencePlaceholder.textContent = sentence;
      })
      .catch(error => {
        console.error(error);
        sentencePlaceholder.textContent = "Error loading sentence";
      });
  }
  

  //test
import axios from 'axios';

const GPT_API_KEY = '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'; // Replace with your actual API key
const GPT_API_URL = 'https://api.openai.com/v1/completions'; // Endpoint for GPT-3.5

export const generateText = async (promptText) => {
  try {
    const response = await axios.post(
      GPT_API_URL,
      {
        model: "text-davinci-003",
        prompt: promptText,
        max_tokens: 1000, // Adjust based on the desired length of generated text
        n: 1, // Number of completions to generate,
        temperature: 0
        
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GPT_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating text:', error);
    return null;
  }
};

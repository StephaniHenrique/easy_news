import axios from 'axios';

const GPT_API_KEY = '';
const GPT_API_URL = 'https://api.openai.com/v1/chat/completions'; // Endpoint for GPT-3.5

export const generateText = async (promptText) => {
  try {
    const response = await axios.post(
      GPT_API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptText }],
        
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GPT_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating text:', error);
    return error;
  }
};

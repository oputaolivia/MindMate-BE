# MindMate 
![MindMate Logo](https://mind-mate-nine.vercel.app/logo1.png)
## Overview
This repository contains the code for a mental chatbot developed as a capstone project during the Women Techsters Fellowship 2023. The chatbot utilizes the OpenAI GPT-3.5 language model through the ChatGPT API. It aims to provide support and engage in conversations related to mental health and well-being.

The chatbot is built using Node.js and JavaScript, with the Express.js framework for creating the server-side application. By integrating the powerful capabilities of OpenAI's GPT-3.5 model, the chatbot can understand and generate human-like responses, making it an effective tool for assisting individuals dealing with mental health challenges.

## Features
- Interactive chat interface powered by OpenAI's GPT-3.5 language model
- Conversations focused on mental health and well-being
- Natural language processing for understanding user input
- Dynamic and context-aware responses to user queries
- Option to customize and train the chatbot for specific use cases

## Installation
1. Clone the repository:

```
git clone https://github.com/oputaolivia/MindMate-BE.git
```

2. Navigate to the project directory:
```
cd MindMate-BE
```

3. Install the dependencies:
```
npm install
```

4. Create an account on the OpenAI platform and obtain an API key.

5. Rename the '.env.example' file to '.env' and replace the 'OPENAI_API_KEY' value with your actual API key.

## Usage

## Customization and Training
The chatbot's behavior and responses can be customized and fine-tuned based on specific requirements. You can explore the following areas for customization:
- Training Data: You can augment the training data with domain-specific conversations or provide additional context to improve the chatbot's understanding of mental health topics.
- Prompt Engineering: Adjust the initial prompt or system message to guide the chatbot's behavior and ensure it maintains a helpful and empathetic tone.
- Response Generation: Implement post-processing techniques to enhance the quality and coherence of the chatbot's responses.

## Limitations
It's important to be aware of the limitations of the chatbot:
- Bias: The chatbot's responses may reflect biases present in the training data, which can lead to inaccurate or potentially harmful information being generated. Exercise caution when relying solely on the chatbot's advice.
- Privacy: Conversations with the chatbot are transmitted to and processed by the OpenAI API. Take necessary precautions when handling sensitive or personal information.
- Context Sensitivity: While the chatbot tries to maintain context throughout a conversation, it may occasionally lose track or provide irrelevant responses. Users should provide clear and concise inputs to ensure better results.

## Contributing
Contributions to the project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


## Acknowledgments
I would like to express our gratitude to the Women Techsters Fellowship 2023 for providing the opportunity to work on this capstone project. Special thanks to OpenAI for their powerful GPT-3.5 language model and API, which forms the core of this chatbot. I also acknowledge the contributions of the open-source community and the valuable feedback received from users during the development process.

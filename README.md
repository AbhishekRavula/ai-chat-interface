# AI Chat Interface with Responsive Design

## Overview

This project implements a responsive AI chat interface that allows users to interact with an AI assistant in real time. Built using React.js with TypeScript, the application integrates with the Hugging Face API to provide intelligent responses to user queries. The design emphasizes accessibility and performance, ensuring a smooth user experience across devices.

## Features

- **Responsive Design**: The layout adapts seamlessly to different screen sizes.
- **Real-time Messaging**: Users can send messages and receive responses instantly.
- **Message Bubbles**: User and AI messages are displayed in distinct bubbles with avatars.
- **Markdown Support**: AI responses can include markdown formatting for better readability.
- **Error Handling**: The application includes robust error handling for API calls.
- **Chat History Export**: Users can download their chat history in JSON format.
- **AI Typing Indicator**: A visual cue indicates when the AI is generating a response.
- **Accessibility**: The app follows WCAG 2.1 guidelines for inclusivity.

## Technology Stack

- **Frontend Framework**: React.js
- **Type Safety**: TypeScript
- **State Management**: Redux
- **Styling**: Tailwind CSS for responsive design
- **API Integration**: Hugging Face API for AI responses

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ai-chat-interface.git
   cd ai-chat-interface
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env` file in the root of the project.
   - Obtain your API token from [Hugging Face](https://huggingface.co/) and add it to the `.env` file as follows:
     ```
     VITE_API_KEY=your_hugging_face_api_key
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Open the application in your browser.
- Type your message in the input field and hit Enter to send.
- Use the "Export Chat" button to download your chat history.

### Handling API Token

If a user does not provide a `VITE_API_KEY`, the application simulates an AI response with a typing delay and echoes back the user message. This ensures that users can still interact with the chat interface even without a [Hugging Face](https://huggingface.co/) key.

## Accessibility

The application has been designed with accessibility in mind, ensuring that all users can navigate and interact with the interface effectively.

## Performance Optimization

The app is optimized for performance, aiming for a high Lighthouse score by implementing best practices in loading times, responsiveness, and accessibility.

## Bonus Features

- Dark mode toggle for improved usability in low-light conditions.
- Animations for smooth transitions between message states.

## Conclusion

This AI chat interface demonstrates a solid understanding of frontend development principles, responsive design, and API integration.

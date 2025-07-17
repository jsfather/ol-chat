# Ol-Chat

Ol-Chat is a Nuxt.js application designed to interact with [Ollama](https://ollama.ai), a local interface for working
with large language models (LLMs). With Ol-Chat, you can download an LLM and start chatting with it seamlessly.

## Prerequisites

1. **Ollama Installed**  
   Make sure [Ollama](https://ollama.ai) is installed on your device. Ollama usually serves on port `11434`.

2. **Node.js**  
   Ensure you have Node.js installed to run this application.

## Features

- **LLM Management**: Download and manage large language models locally.
- **Chat Interface**: Communicate with the LLM directly via an intuitive UI.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jsfather/ol-chat.git
   cd ol-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the Nuxt application:
   ```bash
   npm run dev
   ```

2. Ensure Ollama is running on your device (default port 11434).
3. Open your browser and navigate to:

   ```bash
    http://localhost:3000
   ```
4. Download a model through the interface and start chatting!

## Docker Usage

1. Build the Docker image:
   ```bash
   docker build -t ol-chat .
   ```

2. Run the container:
   ```bash
   docker run -p 54321:3000 ol-chat
   ```

3. Open your browser and navigate to:
   ```bash
   http://localhost:54321
   ```

**Note:** Make sure Ollama is running on your host machine at `localhost:11434` for the Docker container to access it.

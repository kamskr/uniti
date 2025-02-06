# Uniti Server

Uniti server uses [LiveKit](https://livekit.io/) to create a live streaming platform and Firease storage/functions to handle the backend logic.

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase CLI
- LiveKit CLI (https://docs.livekit.io/home/cli/cli-setup/)

### Installation

1. Clone the repository
2. Install dependencies

```bash
brew update && brew install livekit
npm install
```

3. Create a Firebase project

```bash
firebase login
firebase init
```

4. Build

Sometimes you may see the issue "module not found..." after build and serve.

To fix that, add .js to each export in dist/index.js

5. Run locally 

```bash
livekit-server --dev
firebase emulators:start --only functions
```

You can access local emulator connected to local LiveKit server at `127.0.0.1` and port `5001`.


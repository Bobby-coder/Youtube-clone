# Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Bobby-coder/Youtube-clone.git
   cd Primekart
   ```

2. Install dependencies for both client and server

   Navigate to the client folder and install dependencies:

   ```bash
   cd client
   npm install
   ```

   Navigate to the server folder and install dependencies:

   ```bash
   cd server
   npm install
   ```

3. Set up environment variables

   Configure your .env files in the server with necessary variables:

   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - MONGODB_URL
   - JWT_SECRET

4. Run the app

   Start the client (frontend):

   ```bash
   cd client
   npm run dev
   ```

   Start the server (backend):

   ```bash
   cd server
   npm run start
   ```

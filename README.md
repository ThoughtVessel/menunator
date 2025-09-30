# Menunator 🍽️

**AI-Powered Menu Enhancement & Image Generation**

Menunator transforms restaurant menus into beautiful, visually appealing displays with AI-generated food photography and detailed nutritional information.

## ✨ Features

- **📸 Menu Photo Upload**: Upload any restaurant menu image
- **🤖 AI Menu Analysis**: Intelligent menu text extraction and parsing
- **🎨 Custom Image Generation**: AI-generated food photography for each menu item
- **🥗 Diet Information**: Automatic detection of dietary tags (vegetarian, gluten-free, etc.)
- **💅 Beautiful UI**: Modern, responsive design with gradient themes
- **⚡ Real-time Processing**: Live feedback during AI analysis

## 🚀 How It Works

1. **Upload**: Take a photo of any restaurant menu and upload it
2. **Validate**: AI confirms the image contains an actual menu
3. **Analyze**: Extract menu items, descriptions, prices, and dietary information
4. **Generate**: Create custom food photography for each dish
5. **Display**: View your enhanced menu with beautiful AI-generated images

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Google Gemini 2.5 Flash (text analysis & image generation)
- **Build Tool**: Turbopack
- **Deployment**: Vercel-ready

## 🧠 AI Models Used

- **Gemini 2.5 Flash**: Menu text analysis and validation
- **Gemini 2.5 Flash Image Preview**: AI food photography generation

## 🎯 Use Cases

- **Restaurant Owners**: Enhance digital menus with professional food photography
- **Food Bloggers**: Create visually appealing menu content
- **Developers**: Learn AI integration with image and text processing
- **Food Enthusiasts**: Visualize menu items before ordering

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/menunator.git
   cd menunator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Add your Google Gemini API key to the code
   - Get your API key from [Google AI Studio](https://ai.google.dev/)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 API Endpoints

- `POST /api/analyze-menu`: Complete menu analysis and image generation pipeline

## 🎨 Design Features

- **Gradient Backgrounds**: Purple-to-pink gradients throughout
- **Responsive Grid**: Adaptive layout for menu items
- **Loading States**: Beautiful loading animations during processing
- **Error Handling**: Elegant error states with helpful messaging
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## 🔧 Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🚀 Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your Gemini API key as an environment variable
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Developer

**Andrew Robinson**
- [LinkedIn](https://www.linkedin.com/in/andrew-robinson314/)
- [GitHub](https://github.com/thoughtvessel)
- [Portfolio](https://andrewrobinson.framer.website/)

---

*Built with ❤️ using Next.js and Google AI*
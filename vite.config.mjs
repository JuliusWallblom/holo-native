import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "@": "/src"
    }
  },
  define: {
    __DEV__: process.env.NODE_ENV !== "production"
  },
  build: {
    outDir: "dist"
  }
})

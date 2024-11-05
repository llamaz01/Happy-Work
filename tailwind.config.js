/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Escanea todos los archivos en la carpeta src
    './public/index.html',         // Escanea tu archivo HTML si es necesario
  ],
  theme: {
    extend: {},  // Puedes extender el tema aquí si deseas personalizar colores, fuentes, etc.
  },
  plugins: [],   // Aquí puedes agregar plugins de Tailwind como forms, typography, etc.
}

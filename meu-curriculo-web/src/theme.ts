import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  // Vamos remover a 'config' por enquanto e ser explícitos
  styles: {
    global: {
      // Aplicando diretamente no HTML e no Body
      'html, body': {
        backgroundColor: '#050505', // Cor preta explícita
        color: 'whiteAlpha.900',
      },
    },
  },
  // As fontes e cores continuam aqui para o resto do site
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
    themed: `'Zhi Mang Xing', cursive`,
  },
  colors: {
    brand: {
      primary: '#00E5FF',
      secondary: '#007BFF',
    },
    bg: {
      primary: '#050505',
    },
  },
})

export default theme
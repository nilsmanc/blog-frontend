declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {}

  interface CustomThemeOptions extends ThemeOptions {
    shadows: Shadows | string[]
    palette: {
      primary: {
        main: string
      }
    }
    typography: {
      button: {
        textTransform: string
        fontWeight: number
      }
    }
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme
}

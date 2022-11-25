import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const LightTheme: any = {
  dark: false,
  variables: {},
  colors: {},
};

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: LightTheme,
    },
  },
});

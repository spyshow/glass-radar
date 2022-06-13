import chroma from "chroma-js";

const autoColorPicker = (color) => {
  let returnedColor;

  chroma(color).luminance() > 0.5
    ? (returnedColor = chroma(color).darken(2).hex())
    : (returnedColor = chroma(color).brighten(2).hex());
  return returnedColor;
};

export default autoColorPicker;

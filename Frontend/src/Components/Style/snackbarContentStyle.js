const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};
const blackColor = "#000";
const whiteColor = "#FFF";
const primaryColor = ["#9c27b0", "#ab47bc", "#8e24aa", "#af2cc5"];
const warningColor = ["#ff9800", "#ffa726", "#fb8c00", "#ffa21a"];
const dangerColor = ["#f44336", "#ef5350", "#e53935", "#f55a4e"];
const successColor = ["#4caf50", "#66bb6a", "#43a047", "#5cb860"];
const infoColor = ["#00acc1", "#26c6da", "#00acc1", "#00d3ee"];
const roseColor = ["#e91e63", "#ec407a", "#d81b60", "#eb3573"];
const grayColor = [
  "#999",
  "#777",
  "#3C4858",
  "#AAAAAA",
  "#D2D2D2",
  "#DDD",
  "#b4b4b4",
  "#555555",
  "#333",
  "#a9afbb",
  "#eee",
  "#e7e7e7"
];
const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", arial',
  fontWeight: "300",
  lineHeight: "1.5em"
};
const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(" +
    hexToRgb(blackColor) +
    ", 0.42), 0 4px 25px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)"
};
const primaryBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(primaryColor[0]) +
    ",.4)"
};
const infoBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(infoColor[0]) +
    ",.4)"
};
const successBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(successColor[0]) +
    ",.4)"
};
const warningBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(warningColor[0]) +
    ",.4)"
};
const dangerBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(dangerColor[0]) +
    ",.4)"
};
const roseBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" +
    hexToRgb(blackColor) +
    ",.14), 0 7px 10px -5px rgba(" +
    hexToRgb(roseColor[0]) +
    ",.4)"
};

const snackbarContentStyle = {
  root: {
    ...defaultFont,
    flexWrap: "unset",
    position: "relative",
    padding: "20px 15px",
    lineHeight: "20px",
    marginBottom: "20px",
    fontSize: "14px",
    backgroundColor: whiteColor,
    color: grayColor[7],
    borderRadius: "3px",
    minWidth: "unset",
    maxWidth: "unset",
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(whiteColor) +
      ", 0.28), 0 4px 20px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 7px 8px -5px rgba(" +
      hexToRgb(whiteColor) +
      ", 0.2)"
  },
  top20: {
    top: "20px"
  },
  top40: {
    top: "40px"
  },
  info: {
    backgroundColor: infoColor[3],
    color: whiteColor,
    ...infoBoxShadow
  },
  success: {
    backgroundColor: successColor[3],
    color: whiteColor,
    ...successBoxShadow
  },
  warning: {
    backgroundColor: warningColor[3],
    color: whiteColor,
    ...warningBoxShadow
  },
  danger: {
    backgroundColor: dangerColor[3],
    color: whiteColor,
    ...dangerBoxShadow
  },
  primary: {
    backgroundColor: primaryColor[3],
    color: whiteColor,
    ...primaryBoxShadow
  },
  rose: {
    backgroundColor: roseColor[3],
    color: whiteColor,
    ...roseBoxShadow
  },
  message: {
    padding: "0",
    display: "block",
    maxWidth: "89%"
  },
  close: {
    width: "11px",
    height: "11px"
  },
  iconButton: {
    width: "24px",
    height: "24px",
    padding: "0px"
  },
  icon: {
    display: "block",
    left: "15px",
    position: "absolute",
    top: "50%",
    marginTop: "-15px",
    width: "30px",
    height: "30px"
  },
  infoIcon: {
    color: infoColor[3]
  },
  successIcon: {
    color: successColor[3]
  },
  warningIcon: {
    color: warningColor[3]
  },
  dangerIcon: {
    color: dangerColor[3]
  },
  primaryIcon: {
    color: primaryColor[3]
  },
  roseIcon: {
    color: roseColor[3]
  },
  iconMessage: {
    paddingLeft: "50px",
    display: "block"
  },
  actionRTL: {
    marginLeft: "-8px",
    marginRight: "auto"
  }
};

export default snackbarContentStyle;

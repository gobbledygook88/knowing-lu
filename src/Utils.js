class Utils {
  static inView(elDims, vbDims) {
    return (
      elDims.bottom <= vbDims.bottom &&
      elDims.left >= vbDims.left &&
      elDims.right <= vbDims.right &&
      elDims.top >= vbDims.top
    );
  }

  static normalise(name) {
    return name.toLowerCase()
               .replace(/[^\w\s]/gi, "")  // Remove punctuation
               .replace(/ and /gi, "  ")  // Remove 'and'. Note: two spaces
               .trim();
  }
}

export default Utils;

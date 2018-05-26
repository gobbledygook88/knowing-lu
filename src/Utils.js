class Utils {
  static normalise(name) {
    return name.toLowerCase()
               .replace(/[^\w\s]/gi, "")  // Remove punctuation
               .replace(/ and /gi, "  ")  // Remove 'and'. Note: two spaces
               .trim();
  }
}

export default Utils;

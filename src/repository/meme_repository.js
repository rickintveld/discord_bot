const generate = (meme, top_text, bottom_text) => {
  const url = new URL("https://apimeme.com/meme");
  url.searchParams.append("meme", meme);

  if (top_text) {
    url.searchParams.append("top", top_text);
  } else {
    url.searchParams.append("top", "");
  }
  if (bottom_text) {
    url.searchParams.append("bottom", bottom_text);
  } else {
    url.searchParams.append("bottom", "");
  }

  return url.href;
};

const meme_repository = { generate };

export default meme_repository;

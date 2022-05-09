const getVideo = () => {
  switch (promo) {
    case "seu-sucesso":
      return "https://player.vimeo.com/video/685058936?h=be31fb0081";
    case "não-perca":
      return "https://player.vimeo.com/video/685058976?h=f1410febf9";
    case "exclusiva":
      return "https://player.vimeo.com/video/685058976?h=f1410febf9";
    default:
      return "https://player.vimeo.com/video/685058976?h=f1410febf9";
  }
};

if (document.getElementById("video-vsl")) {
  document.getElementById("video-vsl").setAttribute("src", getVideo());
}

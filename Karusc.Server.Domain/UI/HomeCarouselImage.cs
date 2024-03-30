using Karusc.Server.Domain.Files;

namespace Karusc.Server.Domain.UI
{
    public class HomeCarouselImage : FileEntity
    {
        public File<HomeCarouselImage> Image { get; private set; } = new();
        public string ImageURL { get; set; } = string.Empty;
        private HomeCarouselImage() {}

        public static HomeCarouselImage Create(string image)
        {
            var carousel = new HomeCarouselImage();
            carousel.Image = new File<HomeCarouselImage>(carousel, image, carousel.Id.ToString());
            carousel.ImageURL = carousel.Image.FileName;
            return carousel;
        }
    }
}

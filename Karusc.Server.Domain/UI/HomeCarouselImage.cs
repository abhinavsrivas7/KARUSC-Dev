namespace Karusc.Server.Domain.UI
{
    public class HomeCarouselImage : FileEntity
    {
        public File<HomeCarouselImage>? Image { get; private set; } = null;
        public string? ImageURL { get; set; } = null;
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

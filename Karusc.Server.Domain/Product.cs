namespace Karusc.Server.Domain
{
    public record Product(
        int ID,
        string? Title,
        double Price,
        string? Description,
        string? Category,
        string? Image);
}

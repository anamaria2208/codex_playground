namespace CatFacts.Api.Services;

public interface ICatFactsService
{
    Task<string> GetRandomFactAsync(CancellationToken cancellationToken);
}

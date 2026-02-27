using CatFacts.Api.Models;
using CatFacts.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CatFacts.Api.Controllers;

[ApiController]
[Route("api/cat-facts")]
public sealed class CatFactsController(
    ICatFactsService catFactsService,
    ILogger<CatFactsController> logger) : ControllerBase
{
    private readonly ICatFactsService _catFactsService = catFactsService;
    private readonly ILogger<CatFactsController> _logger = logger;

    [HttpGet("random")]
    [ProducesResponseType(typeof(CatFactResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    public async Task<ActionResult<CatFactResponse>> GetRandom(CancellationToken cancellationToken)
    {
        try
        {
            var fact = await _catFactsService.GetRandomFactAsync(cancellationToken);
            return Ok(new CatFactResponse(fact));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unable to load cat fact from external provider.");
            return StatusCode(StatusCodes.Status502BadGateway);
        }
    }
}

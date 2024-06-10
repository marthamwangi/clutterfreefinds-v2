using Microsoft.AspNetCore.Mvc;
using Response;
using Response.Model;
using Space.Model;
using Space.Service;

namespace clutterfreefinds.API.Space.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SpaceController(ISpaceServices spaceServices) : ControllerBase
{
    private readonly ISpaceServices _spaceService = spaceServices;

    [HttpGet]
    public async Task<IResponseDataModel<IEnumerable<SpaceModel>>> GetAllSpaces()
    {
        try
        {
            var result = await _spaceService.GetAllSpaces();
            return result.Success.Equals(true) ? new ResponseDataModel<IEnumerable<SpaceModel>>
            {
                Success = true,
                Data = result.Data
            } : new ResponseDataModel<IEnumerable<SpaceModel>> { Success = false };

        }
        catch (System.Exception)
        {

            throw;
        }
    }
}
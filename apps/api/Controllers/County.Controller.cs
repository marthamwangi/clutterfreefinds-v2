using County.Model;
using County.Service;
using Microsoft.AspNetCore.Mvc;
using Response;
using Response.Model;

namespace clutterfreefinds.API.County.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CountyController(ICountyServices materialServices) : ControllerBase
{
    private readonly ICountyServices _materialService = materialServices;

    [HttpGet]
    public async Task<IResponseDataModel<IEnumerable<CountyModel>>> GetAllCountys()
    {
        try
        {
            var result = await _materialService.GetAllCounty();
            return result.Success.Equals(true) ? new ResponseDataModel<IEnumerable<CountyModel>>
            {
                Success = true,
                Data = result.Data
            } : new ResponseDataModel<IEnumerable<CountyModel>> { Success = false };

        }
        catch (System.Exception)
        {

            throw;
        }
    }
}
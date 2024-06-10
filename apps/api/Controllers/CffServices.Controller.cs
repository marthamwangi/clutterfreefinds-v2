using CFFService.service;
using clutterfreefinds.Service.Model;
using Microsoft.AspNetCore.Mvc;
using Response;
using Response.Model;

namespace clutterfreefinds.API.CffServices.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CffServicesController(ICFFService cFFServices) : ControllerBase
{
    private readonly ICFFService _cffServices = cFFServices;

    [HttpGet]
    public async Task<IResponseDataModel<IEnumerable<CFFServiceModel>>> GetAllServices()
    {
        try
        {
            var result = await _cffServices.GetAllCffServices();
            return result.Success.Equals(true) ? new ResponseDataModel<IEnumerable<CFFServiceModel>>
            {
                Success = true,
                Data = result.Data
            } : new ResponseDataModel<IEnumerable<CFFServiceModel>> { Success = false };

        }
        catch (System.Exception)
        {

            throw;
        }
    }
}
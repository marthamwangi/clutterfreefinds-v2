using Material.Model;
using Material.Service;
using Microsoft.AspNetCore.Mvc;
using Response;
using Response.Model;

namespace clutterfreefinds.API.Space.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MaterialController(IMaterialServices materialServices) : ControllerBase
{
    private readonly IMaterialServices _materialService = materialServices;

    [HttpGet]
    public async Task<IResponseDataModel<IEnumerable<MaterialModel>>> GetAllMaterials()
    {
        try
        {
            var result = await _materialService.GetAllMaterial();
            return result.Success.Equals(true) ? new ResponseDataModel<IEnumerable<MaterialModel>>
            {
                Success = true,
                Data = result.Data
            } : new ResponseDataModel<IEnumerable<MaterialModel>> { Success = false };

        }
        catch (System.Exception)
        {

            throw;
        }
    }
}
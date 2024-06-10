using Microsoft.AspNetCore.Mvc;
using Newsletter.Model;
using Newsletter.Services;
using Response;
using Response.Model;

namespace clutterfreefinds.API.Newsletter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsletterController : ControllerBase
{
    private INewsletterService _newsletterService;
    public NewsletterController(INewsletterService newsletterServices)
    {
        _newsletterService = newsletterServices;
    }

    [HttpPost]
    public async Task<IResponseModel> Create(NewsletterItem newsletterItem)
    {
        try
        {
            var result = await _newsletterService.AddNewsletter(newsletterItem);
            return result.Success.Equals(true) ? new ResponseModel { Success = true } : new ResponseModel { Success = false };
        }
        catch (Exception)
        {

            throw;
        }
    }


}

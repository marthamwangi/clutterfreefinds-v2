using Microsoft.AspNetCore.Mvc;
using Quotation.Request.Service;
using QuotationRequest.Model;
using Response;
using Response.Model;

namespace clutterfreefinds.API.Quotation.Request.Controllers;
[ApiController]
[Route("api/[controller]")]
public class QuotationRequestController(IQuotationRequestService quotationRequestService) : ControllerBase
{
    private readonly IQuotationRequestService _quotationRequestService = quotationRequestService;

    [HttpPost]
    public async Task<IResponseModel> Create(QuotationRequestModel quotation)
    {
        try
        {
            var result = await _quotationRequestService.CreateQuotationRequest(quotation);
            return result.Success.Equals(true) ? new ResponseModel { Success = true, } : new ResponseModel { Success = false };

        }
        catch (System.Exception)
        {

            throw;
        }
    }
}
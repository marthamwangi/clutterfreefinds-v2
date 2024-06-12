using Inquiry.Service;
using Inquiry.Model;
using Microsoft.AspNetCore.Mvc;
using Response;
using Response.Model;

namespace clutterfreefinds.API.Inquiry.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InquiryController(IInquiryService inquiryService) : ControllerBase
{
    private readonly IInquiryService _inquiryService = inquiryService;
    [HttpPost]
    public async Task<IResponseModel> CreateInquiry(InquiryModel inquiryModel)
    {
        try
        {
            var result = await _inquiryService.CreateInquiryRequest(inquiryModel);
            return result.Success.Equals(true) ? new ResponseModel { Success = true, Message = "Inquiry Sent!!", StatusCode = 200 }
                 : new ResponseModel { Success = false, Message = "An Error occured while sending Inquiry. Please try again", StatusCode = 500 };
        }
        catch (System.Exception)
        {

            throw;
        }
    }
}
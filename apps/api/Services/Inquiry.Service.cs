using Inquiry.Model;
using Response;
using Response.Model;
using System.ComponentModel;
using System.Net.Mail;
using System.Text;

namespace Inquiry.Service;

public interface IInquiryService
{
    Task<IResponseModel> CreateInquiryRequest(InquiryModel inquiry);
}

public class InquiryRequestService : IInquiryService
{
    public static readonly string companyEmail = "clutterfreefinds@gmail.com";
    public static readonly string appPassword = "tmhejxpjxmafoceg";
    static bool mailSent = false;

    public async Task<IResponseModel> CreateInquiryRequest(InquiryModel inquiryItem)
    {
        try
        {
            MailAddress from = new(companyEmail, "Clutter Free Finds");
            // Set destinations for the email message.
            MailAddress to = new(companyEmail);
            // Specify the message content.
            StringBuilder mailBody = new StringBuilder();
            mailBody.AppendFormat("<h1>Client Inquiry</h1>");
            mailBody.AppendFormat("<br />");
            mailBody.AppendFormat($"<div>{inquiryItem.Email}</div>");
            mailBody.AppendFormat("<br />");
            mailBody.AppendFormat($"<div>{inquiryItem.Name}</div>");
            mailBody.AppendFormat("<br />");
            mailBody.AppendFormat($"<div>{inquiryItem.Phone}</div>");
            mailBody.AppendFormat("<br />");
            mailBody.AppendFormat($"<div>{inquiryItem.Message}</div>");
            MailMessage message = new(from, to)
            {
                Subject = inquiryItem.Subject,
                Body = mailBody.ToString(),
                BodyEncoding = Encoding.UTF8,
                IsBodyHtml = true
            };

            SmtpClient smtp = new()
            {
                Host = "smtp.gmail.com",
                Port = 587,
                Timeout = 10000,
                UseDefaultCredentials = true,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new System.Net.NetworkCredential(companyEmail, appPassword)
            };
            smtp.UseDefaultCredentials = false;
            smtp.SendCompleted += new SendCompletedEventHandler(SendCompletedCallback);
            await smtp.SendMailAsync(message);

            return mailSent ? new ResponseModel { Success = true, Message = "Inquiry Sent!!", StatusCode = 200 }
                 : new ResponseModel { Success = false, Message = "An Error occured while sending Inquiry", StatusCode = 500 };
        }
        catch (Exception)
        {
            throw;
        }
    }

    private void SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
    {
        // Get the unique identifier for this asynchronous operation.
        string token = e.UserState.ToString();

        if (e.Error != null)
        {
            Console.WriteLine("[{0}] {1}", token, e.Error.ToString());
        }
        mailSent = true;
    }
}

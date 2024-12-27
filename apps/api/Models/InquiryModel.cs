namespace Inquiry.Model
{
    public class InquiryModel
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Phone { get; set; }
        public string? Message { get; set; }
        public string? Subject { get; set; } = "CFF Inquiry";
    }
}
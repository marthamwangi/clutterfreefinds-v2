using System.ComponentModel.DataAnnotations;
using County.Model;
using Google.Cloud.Firestore;

namespace Client.Details.Model
{
    [FirestoreData]
    public class ClientDetailsModel
    {
        [FirestoreProperty("address")]
        public string? Address { get; set; }

        [Required]
        [FirestoreProperty("email")]
        public string? Email { get; set; }

        [Required]
        [FirestoreProperty("fname")]
        public string? FirstName { get; set; }

        [FirestoreProperty("lname")]
        public string? LastName { get; set; }

        [Required]
        [FirestoreProperty("phone")]
        public string? Phone { get; set; }

        [FirestoreProperty("hseNumber")]
        public string? HouseNumber { get; set; }

        [Required]
        [FirestoreProperty("county")]
        public string? County { get; set; }

        [Required]
        [FirestoreProperty("constituency")]
        public string? Constituency { get; set; }

        [Required]
        [FirestoreProperty("ward")]
        public string? Ward { get; set; }
    }
}
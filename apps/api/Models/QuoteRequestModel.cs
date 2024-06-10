using System.ComponentModel.DataAnnotations;
using Client.Details.Model;
using clutterfreefinds.Service.Model;
using Google.Cloud.Firestore;
using Space.Model;

namespace QuotationRequest.Model
{
    [FirestoreData]
    public class QuotationRequestModel
    {

        [Required]
        [FirestoreProperty("serviceDate")]
        public DateTime ServiceDate { get; set; }

        [FirestoreProperty("images")]
        public string[] Images { get; set; } = [];

        [FirestoreProperty("notes")]
        public string? Notes { get; set; } = "";

        [FirestoreProperty("clientDetails")]
        public ClientDetailsModel? ClientDetails { get; set; }

        [FirestoreProperty("material")]
        public string? Material { get; set; } = null;

        [Required]
        [FirestoreProperty("space")]
        public required string Space { get; set; }

        [Required]
        [FirestoreProperty("service")]
        public required string Service { get; set; }

        [Required]
        [FirestoreProperty("minPrice")]
        public int MinimumPrice { get; set; }

        [Required]
        [FirestoreProperty("maxPrice")]
        public int MaximumPrice { get; set; }

        [Required]
        [FirestoreProperty("serviceType")]
        public required string ServiceType { get; set; }
    }

}
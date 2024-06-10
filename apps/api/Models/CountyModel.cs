using Google.Cloud.Firestore;

namespace County.Model
{
    public interface IConstituency
    {
        public string? Name { get; set; }

        public List<object>? Wards { get; set; }
    }

    public interface ICountyModel
    {
        public long CountyCode { get; set; }
        public string? Name { get; set; }

        public IConstituency[]? Constituencies { get; set; }

    }

    //CLASS
    [FirestoreData]
    public class Constituency
    {
        [FirestoreProperty("name")]
        public string? Name { get; set; }

        [FirestoreProperty("wards")]
        public List<object>? Wards { get; set; }
    }

    [FirestoreData]
    public class CountyModel
    {
        [FirestoreProperty("countyCode")]
        public long CountyCode { get; set; }

        [FirestoreProperty("name")]
        public string? Name { get; set; }

        [FirestoreProperty("constituencies")]
        public List<object>? Constituencies { get; set; }

    }
}
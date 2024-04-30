namespace Karusc.Server.Domain.Users
{
    public class Address
    {
        public Guid Id { get; set; } = new Guid();
        public string Recipient { get; private set; }
        public string Line1 { get; private set; }
        public string Line2 { get; private set; }
        public string City { get; private set; }
        public string State { get; private set; }
        public string Country { get; private set; }
        public string Pincode { get; private set; }
        public string Phone { get; private set; }
        public User User { get; private set; } = null!;
        public Guid UserId { get; private set; }

        private Address(
            string recipient,
            string line1,
            string line2,
            string city,
            string state,
            string country,
            string pincode,
            string phone)
        {
            Recipient = recipient;
            Line1 = line1;
            Line2 = line2;
            City = city;
            State = state;
            Country = country;
            Pincode = pincode;
            Phone = phone;
        }

        public static Address Create(
            string recipient,
            string line1,
            string line2,
            string city,
            string state,
            string country,
            string pincode,
            string phone,
            User user)
        {
            var address = new Address(
               recipient,
               line1,
               line2,
               city,
               state,
               country,
               pincode,
               phone);

            address.User = user;
            address.UserId = address.User.Id;
            return address;
        }

        public void Update(
            string recipient,
            string line1,
            string line2,
            string city,
            string state,
            string country,
            string pincode,
            string phone)
        {
            Recipient = recipient;
            Line1 = line1; 
            Line2 = line2; 
            City = city;
            State = state;
            Country = country;
            Pincode = pincode;
            Phone = phone;
        }
    }
}

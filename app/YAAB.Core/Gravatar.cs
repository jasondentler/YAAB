using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace YetAnotherAgileBoard
{
    public static class Gravatar
    {
        public enum DefaultImage
        {
            Default,
            FourOFour,
            MysteryMan,
            Identicon,
            MonsterId,
            Wavatar,
            Retro,
            Blank
        }

        public enum Rating
        {
            G,
            PG,
            R,
            X
        }

        public static string GetUrl(
            string emailAddress,
            bool secure = true,
            int size = 80,
            DefaultImage defaultImage = DefaultImage.Retro,
            Rating rating = Rating.G)
        {
            var hash = GetHash(emailAddress);

            var parms = new Dictionary<string, string>()
            {
                {"s", size.ToString()},
                {"rating", GetRatingString(rating)},
                {"d", GetDefaultImageString(defaultImage)}
            };

            var values = parms.Where(kv => !string.IsNullOrWhiteSpace(kv.Value))
                .Select(kv => Uri.EscapeUriString(kv.Key) + "=" + Uri.EscapeUriString(kv.Value));

            var query = string.Join("&", values);

            var builder = new UriBuilder(
                secure ? "https" : "http",
                "www.gravatar.com")
            {
                Path = "avatar/" + hash,
                Query = query
            };
            return builder.Uri.ToString();
        }


        public static string GetHash(string emailAddress)
        {
            emailAddress = emailAddress.Trim().ToLowerInvariant();

            // Create a new instance of the MD5CryptoServiceProvider object.  
            var md5Hasher = MD5.Create();

            // Convert the input string to a byte array and compute the hash.  
            var data = md5Hasher.ComputeHash(Encoding.UTF8.GetBytes(emailAddress));

            // Create a new Stringbuilder to collect the bytes  
            // and create a string.  
            var sb = new StringBuilder();

            // Loop through each byte of the hashed data  
            // and format each one as a hexadecimal string.  
            foreach (var t in data)
            {
                sb.Append(t.ToString("x2"));
            }

            return sb.ToString();  // Return the hexadecimal string. 
        }

        private static string GetRatingString(Rating rating)
        {
            return rating.ToString().ToLowerInvariant();
        }

        private static string GetDefaultImageString(DefaultImage defaultImage)
        {
            switch (defaultImage)
            {
                case DefaultImage.Default:
                    return string.Empty;
                case DefaultImage.FourOFour:
                    return "404";
                case DefaultImage.MysteryMan:
                    return "mm";
                case DefaultImage.Identicon:
                    return "identicon";
                case DefaultImage.MonsterId:
                    return "monsterid";
                case DefaultImage.Wavatar:
                    return "wavatar";
                case DefaultImage.Retro:
                    return "retro";
                case DefaultImage.Blank:
                    return "blank";
                default:
                    throw new ArgumentOutOfRangeException(nameof(defaultImage), defaultImage, null);
            }
        }
    }
}

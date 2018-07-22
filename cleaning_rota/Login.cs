using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    static public class Login
    {
        static public void User_login()
        {
            Console.Write("Email: ");
            string email = Console.ReadLine() ?? string.Empty;

            Console.Write("Password: ");
            string password = Console.ReadLine() ?? string.Empty;

            string login_hash = email + password;
            int _hash = login_hash.GetHashCode();
            string hash = _hash.ToString();

            if (Verify_hash(hash))
            {
                Set_user_data(email);
            }
        }

        static public void Set_user_data(string _email) {
            if (_email.Equals("user01")) {
                Cleaner.Add_cleaner_to_list("Ged");
                Cleaner.Add_cleaner_to_list("Razvan");

                House.Add_room_to_list("Kitchen", "1");
                House.Add_room_to_list("Bedroom", "2");
                House.Add_room_to_list("Lounge", "3");
                House.Add_room_to_list("Garage", "4");
            }
        }


        static public bool Verify_hash(string _hash)
        {
            List<string> hash_description = new List<string>();
            List<string> login_hash_array = new List<string>();

            using (var reader = new StreamReader(@"../../login_hash.txt"))
            {
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(',');

                    hash_description.Add(values[0]);
                    login_hash_array.Add(values[1]);
                }
            }

            if (login_hash_array.Contains(_hash))
            {
                Console.Write("Success");
                return true;
            }
            else
            {
                Console.Write("Failed");
                return false;
            }
        }
    }
}

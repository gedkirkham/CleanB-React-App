using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    static public class Add_cleaners
    {
        static List<String> user_list = new List<String>();

        static public void Add_cleaner_to_list(String _user_name)
        {
            user_list.Add(_user_name);
        }

        static public String Get_cleaner_from_list()
        {
            String error = "No users found.";

            for(int i = 0; i < user_list.Count; i++)
            {
                Console.WriteLine(i + ". " + user_list[i]);
            }

            return error;
        }

        internal static bool validate_cleaner(string v)
        {
            throw new NotImplementedException();
        }
    }
}
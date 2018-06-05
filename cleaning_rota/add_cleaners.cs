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
                Console.WriteLine(i+1 + ". " + user_list[i]);
            }

            return error;
        }

        static public String Get_cleaner(String _input)
        {
            int _input_converted = Convert.ToInt16(_input);
            string output = user_list[_input_converted - 1];

            return output;
        }

        static public int Get_user_list_length()
        {
            return user_list.Count;
        }

        internal static bool validate_cleaner(string v)
        {
            throw new NotImplementedException();
        }//needed?

        internal static bool print_list()
        {
            throw new NotImplementedException();
        }
    }
}
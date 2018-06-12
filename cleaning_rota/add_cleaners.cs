using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    static public class Add_cleaners
    {
        static List<String> cleaner_list = new List<String>();

        static public void Add_cleaner_to_list(String _user_name)
        {
            cleaner_list.Add(_user_name);
        }

        static public bool Get_cleaner_list()
        {
            if(cleaner_list.Count > 0)
            {
                for (int i = 0; i < cleaner_list.Count; i++)
                {
                    Console.WriteLine(i + 1 + ". " + cleaner_list[i]);
                }
            } else
            {
                bool add_cleaner_flag;
                do
                {
                    add_cleaner_flag = false;
                    Console.WriteLine("You do not have any cleaners yet. Would you like to add some? " + Constants.YN_brackets);
                    String add_cleaner = Console.ReadLine() ?? string.Empty;
                    add_cleaner_flag = User_input_verification.YN(add_cleaner);//add trigger if user inputs N
                } while (add_cleaner_flag);

                return false;
            }

            return true;
        }

        static public String Get_cleaner(String _input)
        {
            int _input_converted = Convert.ToInt16(_input);
            string output = cleaner_list[_input_converted - 1];

            return output;
        }

        static public int Get_user_list_length()
        {
            return cleaner_list.Count;
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
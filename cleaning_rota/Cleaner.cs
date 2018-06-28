using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    static public class Cleaner
    {
        static List<String> cleaner_list = new List<String>();

        static public void Add_cleaner_to_list(string _name)
        {
            cleaner_list.Add(_name);
        }

        static public int Get_cleaner_list_count()
        {
            return cleaner_list.Count;
        }

        static public void Get_cleaner_list()
        {
            if (cleaner_list.Count > 0)
            {
                for (int i = 0; i < cleaner_list.Count; i++)
                {
                    Console.WriteLine(i + 1 + ". " + cleaner_list[i]);
                }
            } else
            {
                string _user_input = Menu.Nothing_returned_add_something("cleaners");

                if (_user_input.Equals("Y", StringComparison.OrdinalIgnoreCase))
                {
                    Add_cleaner();
                }
                else
                {
                    Menu.Main_menu();
                }

                Get_cleaner_list();
            }
        }

        static public string Cleaner_nothing_returned()
        {
            string _user_input = Menu.Nothing_returned_add_something("cleaners");
            if (_user_input.Equals("Y", StringComparison.OrdinalIgnoreCase))
            {
                Cleaner.Add_cleaner();
            }

            return _user_input;
        }

        static public void Add_cleaner()
        {
            bool add_cleaner_flag = false;
            do
            {
                Console.WriteLine();
                Console.Write("Name: ");
                string cleaner_name = Console.ReadLine() ?? String.Empty;
                Add_cleaner_to_list(cleaner_name);

                add_cleaner_flag = Menu.Add_another(add_cleaner_flag);               
            } while (add_cleaner_flag);
        }

        static public String Get_cleaner(int _input)
        {
            string output = cleaner_list[_input - 1];

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
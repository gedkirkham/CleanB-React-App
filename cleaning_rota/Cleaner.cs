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
            if(cleaner_list.Count > 0)
            {
                for (int i = 0; i < cleaner_list.Count; i++)
                {
                    Console.WriteLine(i + 1 + ". " + cleaner_list[i]);
                }
            } else
            {
                bool add_cleaner_flag;
                string add_cleaner_user_flag;
                do
                {
                    add_cleaner_flag = false;
                    Console.Write("You do not have any cleaners. Would you like to add some? " + Constants.YN_brackets);
                    add_cleaner_user_flag = Console.ReadLine() ?? string.Empty;
                    add_cleaner_flag = User_input_verification.YN(add_cleaner_user_flag);
                } while (add_cleaner_flag);

                if (add_cleaner_user_flag.Equals("Y",StringComparison.OrdinalIgnoreCase))
                {
                    Add_cleaner();
                }
            }
        }

        static public void Add_cleaner()
        {
            bool add_cleaner_flag = false;
            do
            {
                Console.Write("Name: ");
                String cleaner_name = Console.ReadLine() ?? String.Empty;
                Add_cleaner_to_list(cleaner_name);

                bool add_cleaner_flag_valid;
                do
                {
                    add_cleaner_flag_valid = false;

                    Console.Write("Add another? (" + Constants.YN + "): ");
                    var add_cleaner_flag_user = Console.ReadLine() ?? String.Empty;

                    switch (add_cleaner_flag_user.ToUpper())
                    {
                        case "Y":
                            add_cleaner_flag = true;
                            break;
                        case "N":
                            add_cleaner_flag = false;
                            break;
                        default:
                            Console.WriteLine(Constants.option_was_not_recognised);
                            add_cleaner_flag_valid = true;
                            break;
                    }
                } while (add_cleaner_flag_valid);
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
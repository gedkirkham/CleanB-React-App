using System;
using System.Collections.Generic;

namespace cleaning_rota
{
    static public class User_input_verification
    {
        static public bool YN(string _user_input)
        {
            bool flag = false;
            switch (_user_input.ToUpper())
            {
                case "Y":
                case "N":
                    break;
                default:
                    Console.WriteLine();
                    Console.WriteLine(Constants.option_was_not_recognised);
                    flag = true;
                    break;
            }

            return flag;
        }

        static public (bool,int) Number_validation(string _user_input)
        {
            if (int.TryParse(_user_input, out int number))
            {
                return (false,number);                
            }
            else
            {
                Console.WriteLine();
                Console.WriteLine(Constants.option_was_not_a_number);
                return (true,number);
            }
        }

        static public bool Number_range(int _user_input, int _menu_count)
        {
            bool flag = false;
            switch (_user_input)
            {
                case var n when _user_input > 0 && _user_input <= _menu_count:
                    break;
                default:
                    Console.WriteLine();
                    Console.WriteLine(Constants.option_was_out_of_range);
                    flag = true;
                    break;
            }

            return flag;
        }
    }
}
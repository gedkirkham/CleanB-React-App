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
                    Console.WriteLine(Constants.option_was_not_recognised);
                    flag = true;
                    break;
            }

            return flag;
        }
    }
}
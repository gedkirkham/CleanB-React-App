using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    class Program
    {
        private static rota_assignment _rota_assignment;//move these?
        private static rota_assignment rota_assignment;//move these?

        static void Main(string[] args)
        {
            //login/create account
            bool account_option_flag = false;
            var account_option = string.Empty;
            do
            {
                Console.Write("Do you have an account? " + Constants.YN_brackets);
                account_option = Console.ReadLine();
                account_option_flag = User_input_verification.YN(account_option);          
            } while (account_option_flag);

            if(account_option.Equals("Y",StringComparison.OrdinalIgnoreCase))
            {
                Login.User_login();
            } else if(account_option.Equals("Y", StringComparison.OrdinalIgnoreCase))
            {
                Create_account.User_create_account();
            }

            do
            {
                Menu.Main_menu();
            } while (true);
            
            //ask what weekend to start 
            rota_calendar _rota_calendar = new rota_calendar();

            bool validate_calendar_input = false;
            while (!validate_calendar_input)
            {
                Console.WriteLine("When should this rota start? dd/mm/yyyy");
                _rota_calendar.validate_calendar_input();
            }

            //assign people to rooms
            rota_assignment = _rota_assignment = new rota_assignment();

            _rota_assignment.print_rota(); //try and avoid a single person cleaning a single room each week //highlight any clashes

            //allow person to remove themselves
            //allow person to amend their name
            Console.ReadKey();
        }        
    }
}

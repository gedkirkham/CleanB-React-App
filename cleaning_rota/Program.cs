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

            Menu.Main_menu();

            //finished?
            bool finished_flag = false;
            do
            {
                Console.Write("Finished? (" + Constants.YN + "): ");
                var finished_flag_user = Console.ReadLine() ?? String.Empty;

                switch(finished_flag_user.ToUpper())
                {
                    case "Y":
                        finished_flag = true;
                        create_calendar();
                        break;
                    case "N":
                        finished_flag = true;
                        Menu.Main_menu();                        
                        var display_main_menu_user = Console.ReadLine() ?? String.Empty;

                        break;
                    default:
                        Console.WriteLine(Constants.option_was_not_recognised);
                        finished_flag = false;
                        break;                        
                }
            } while (!finished_flag);

            //decide if users are exempt from certain rooms
            cleaners_exemption _cleaners_exemption = new cleaners_exemption();

            Console.WriteLine("Are cleaners exempt from any particular rooms?");
            bool users_exempt = _cleaners_exemption.true_false_response_validation(Console.ReadLine());

            while (users_exempt)
            {
                Console.WriteLine("Which user is exempt?");
                Console.WriteLine(Cleaner.print_list());

                bool cleaner_validation = false;
                while (!cleaner_validation)
                {
                    cleaner_validation = Cleaner.validate_cleaner(Console.ReadLine()); //add exception message
                }

                bool more_exempt = true;
                while (more_exempt)
                {
                    Console.WriteLine("What room are they exempt from?");
                    Console.WriteLine(House.print_list());

                    bool room_validation = false;
                    while (!room_validation)
                    {
                        room_validation = House.validate_room(Console.ReadLine()); //add exception message
                    }

                    Console.WriteLine("Any more rooms?");
                    more_exempt = _cleaners_exemption.true_false_response_validation(Console.ReadLine());
                }

                Console.WriteLine("Any more cleaners exempt?");
                users_exempt = _cleaners_exemption.true_false_response_validation(Console.ReadLine());
            }

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

        

        static public void Logout()
        {
        }

        static public void Display_calendar()
        {
        }

        

        

        private static void create_calendar()
        {
            
        }
    }
}

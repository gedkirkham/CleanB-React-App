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

            //add rooms
            bool more_rooms_flag = false;
            do
            {
                Console.WriteLine("What is the name of the room?");
                Console.Write("Name: ");
                String room_name = Console.ReadLine();

                Console.WriteLine("How frequently should " + room_name + " be cleaned? Once a week/once every two weeks/once every three weeks etc.");

                Console.Write("Every (weeks): ");
                Build_location.Set_room(room_name, Console.ReadLine());

                var room_option = String.Empty;
                bool more_option = false;
                do
                {
                    Console.Write("Add another room?" + "(" + Constants.YN + "): ");
                    room_option = Console.ReadLine() ?? String.Empty;

                    switch (room_option.ToUpper())
                    {
                        case "Y":
                            more_rooms_flag = true;
                            more_option = false;
                            break;
                        case "N":
                            more_rooms_flag = false;
                            more_option = false;
                            break;
                        default:
                            Console.WriteLine(Constants.option_was_not_recognised);
                            more_option = true;
                            break;
                    }
                } while (more_option);
                
            } while (more_rooms_flag);

            //add users
            bool add_cleaner_flag = false;
            do
            {
                Console.Write("Add the cleaners name: ");
                String cleaner_name = Console.ReadLine() ?? String.Empty;
                Add_cleaners.Add_cleaner_to_list(cleaner_name);

                bool add_cleaner_flag_valid = false;
                do
                {
                    Console.Write("Add another? (" + Constants.YN + "): ");
                    var add_cleaner_flag_user = Console.ReadLine() ?? String.Empty;

                    switch (add_cleaner_flag_user.ToUpper())
                    {
                        case "Y":
                            add_cleaner_flag_valid = true;
                            add_cleaner_flag = true;
                            break;
                        case "N":
                            add_cleaner_flag_valid = true;
                            add_cleaner_flag = false;
                            break;
                        default:
                            Console.WriteLine(Constants.option_was_not_recognised);
                            add_cleaner_flag_valid = false;
                            break;
                    }
                } while (!add_cleaner_flag_valid);
            } while (add_cleaner_flag);

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
                Console.WriteLine(Add_cleaners.print_list());

                bool cleaner_validation = false;
                while (!cleaner_validation)
                {
                    cleaner_validation = Add_cleaners.validate_cleaner(Console.ReadLine()); //add exception message
                }

                bool more_exempt = true;
                while (more_exempt)
                {
                    Console.WriteLine("What room are they exempt from?");
                    Console.WriteLine(Build_location.print_list());

                    bool room_validation = false;
                    while (!room_validation)
                    {
                        room_validation = Build_location.validate_room(Console.ReadLine()); //add exception message
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

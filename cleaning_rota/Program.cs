using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    class Program
    {
        static void Main(string[] args)
        {
            bool account_option_flag = false;
            do
            {
                Console.Write("Do you have an account?" + "(" + constants.YN + "): ");//add constant
                var account_option = Console.ReadLine() ?? string.Empty;

                account_option_flag = false;
                switch (account_option.ToUpper())
                {
                    case "Y":
                        login();
                        break;
                    case "N":
                        create_account();
                        break;
                    default:
                        Console.WriteLine(constants.option_was_not_recognised);
                        account_option_flag = true;
                        break;
                }

            } while (account_option_flag);

            //add rooms
            Build_location _build_location = new Build_location();

            bool more_rooms_flag = false;
            do
            {
                Console.WriteLine("What is the name of the room?");
                Console.Write("Name: ");
                String room_name = Console.ReadLine();

                _build_location.Set_room_name(room_name);
                Console.WriteLine("How frequently should " + room_name + " be cleaned? Once a week/once every two weeks/once every three weeks etc.");

                Console.Write("Every (weeks): ");
                _build_location.Set_room_frequency(Console.ReadLine());

                var room_option = String.Empty;
                bool more_option = false;
                do
                {
                    Console.Write("Add another room?" + "(" + constants.YN + "): ");
                    room_option = Console.ReadLine() ?? String.Empty;

                    switch (room_option.ToUpper())
                    {
                        case "Y":
                            more_rooms_flag = true;
                            break;
                        case "N":
                            more_rooms_flag = false;
                            break;
                        default:
                            Console.WriteLine(constants.option_was_not_recognised);
                            more_option = true;
                            break;
                    }
                } while (more_option);
                
            } while (more_rooms_flag);

            //add users
            Add_cleaners _add_cleaners = new Add_cleaners();            

            bool add_cleaner_flag = false;
            do
            {
                Console.Write("Add the cleaners name: ");
                String cleaner_name = Console.ReadLine() ?? String.Empty;
                _add_cleaners.Add_cleaner_to_list(cleaner_name);

                bool add_cleaner_flag_valid = false;
                do
                {
                    Console.Write("Add another? (" + constants.YN + ")");
                    var add_cleaner_flag_user = Console.ReadLine() ?? String.Empty;

                    switch (add_cleaner_flag_user.ToUpper())
                    {
                        case "Y":
                            add_cleaner_flag_valid = true;
                            break;
                        case "N":
                            add_cleaner_flag_valid = false;
                            break;
                        default:
                            Console.WriteLine(constants.option_was_not_recognised);
                            add_cleaner_flag_valid = false;
                            break;
                    }
                } while (!add_cleaner_flag_valid);
            } while (add_cleaner_flag);

            //finished?
            bool finished_flag = false;
            do
            {
                Console.Write("Finished? (" + constants.YN + "): ");
                var finished_flag_user = Console.ReadLine() ?? String.Empty;

                switch(finished_flag_user.ToUpper())
                {
                    case "Y":
                        finished_flag = true;
                        create_calendar();
                        break;
                    case "N":
                        finished_flag = true;
                        Display_main_menu();
                        var display_main_menu_user = Console.ReadLine() ?? String.Empty;

                        break;
                    default:
                        Console.WriteLine(constants.option_was_not_recognised);
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
                Console.WriteLine(_add_cleaners.print_list());

                bool cleaner_validation = false;
                while (!cleaner_validation)
                {
                    cleaner_validation = _add_cleaners.validate_cleaner(Console.ReadLine()); //add exception message
                }

                bool more_exempt = true;
                while (more_exempt)
                {
                    Console.WriteLine("What room are they exempt from?");
                    Console.WriteLine(_build_location.print_list());

                    bool room_validation = false;
                    while (!room_validation)
                    {
                        room_validation = _build_location.validate_room(Console.ReadLine()); //add exception message
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
        }

        private static void Display_main_menu()
        {
            bool display_main_menu_flag = true;
            var menu_user_input = String.Empty;

            do
            {
                Console.WriteLine(
                "1. Users.\n" +
                "2. Calendar.\n" +
                "3. Logout.\n"
                );

                menu_user_input = Console.ReadLine() ?? String.Empty;
                switch (menu_user_input)
                {
                    case "1":
                        Display_user_list_menu();
                        display_main_menu_flag = false;
                        break;
                    case "2":
                        display_calendar();
                        display_main_menu_flag = false;
                        break;
                    case "3":
                        logout();
                        display_main_menu_flag = false;
                        break;
                    default:
                        Console.WriteLine(constants.option_was_not_recognised);
                        display_main_menu_flag = true;
                        break;
                }
                    
            } while (display_main_menu_flag);
        }

        public static void Display_user_list_menu()
        {
            bool display_user_list_menu_flag = true;
            var menu_user_input = String.Empty;

            _add_cleaners.Get_cleaner_from_list(); //carry on from here 13/05/2018

            do
            {
                foreach (var item in user_list)
                {
                    Console.Write(item);
                }
                Console.WriteLine(
                "1. Users.\n" +
                "2. Calendar.\n" +
                "3. Logout.\n"
                );

                menu_user_input = Console.ReadLine() ?? String.Empty;
                switch (menu_user_input)
                {
                    case "1":
                        display_user_list_menu_flag = false;
                        break;
                    default:
                        Console.WriteLine(constants.option_was_not_recognised);
                        display_user_list_menu_flag = true;
                        break;
                }

            } while (display_user_list_menu_flag);
        }

        private static void logout()
        {
        }

        private static void display_calendar()
        {
        }

        private static void display_user_menu()
        {
            bool display_user_menu_flag = true;
            var menu_user_input = String.Empty;
            do
            {
                Console.WriteLine(
                "1. Exempt from room.\n"
                );

                menu_user_input = Console.ReadLine() ?? String.Empty;
                switch (menu_user_input)
                {
                    case "1":
                        display_room_list_menu();
                        display_user_menu_flag = false;
                        break;
                    default:
                        Console.WriteLine(constants.option_was_not_recognised);
                        display_user_menu_flag = true;
                        break;
                }

            } while (display_user_menu_flag);
        }

        private static void create_calendar()
        {
            
        }

        private static void login()
        {
           
        }

        private static void create_account()
        {
            Console.Write("First name: ");
            string first_name = Console.ReadLine();

            Console.Write("Last name: ");
            string last_name = Console.ReadLine();

            Console.Write("Email: ");
            string email = Console.ReadLine();
        }
    }
}

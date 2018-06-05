﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    class Program
    {
        private static rota_assignment _rota_assignment;
        private static rota_assignment rota_assignment;

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
            //Build_location _build_location = new Build_location();

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
                    Console.Write("Add another room?" + "(" + constants.YN + "): ");
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
                            Console.WriteLine(constants.option_was_not_recognised);
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
                    Console.Write("Add another? (" + constants.YN + "): ");
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

        private static void Display_main_menu()
        {
            bool display_main_menu_flag = true;
            var menu_user_input = String.Empty;

            do
            {
                Console.WriteLine(
                "1. Users\n" +
                "2. Calendar\n" +
                "3. Logout"
                );

                Console.Write("Select: ");
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

        static public void Display_user_list_menu()
        {
            bool display_user_list_menu_flag = true;
            var menu_user_input = String.Empty;

            do
            {
                Add_cleaners.Get_cleaner_from_list();

                Console.Write("Select: ");
                menu_user_input = Console.ReadLine() ?? String.Empty; 
                int menu_user_input_converted = Convert.ToInt16(menu_user_input);

                switch (menu_user_input_converted)//add error handling
                {
                    case var n when menu_user_input_converted > 0 && menu_user_input_converted < Add_cleaners.Get_user_list_length():
                        display_user_list_menu_flag = false;
                        display_user_menu(n);
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

        private static void display_user_menu(int user_number)
        {
            bool display_user_menu_flag = true;
            do
            {
                Console.Write(
                    "1. Exempt from room\n" +
                    "Select: "
                );

                var menu_user_input = Console.ReadLine() ?? String.Empty;
                switch (menu_user_input)
                {
                    case "1":
                        Display_room_list_menu();
                        display_user_menu_flag = false;
                        break;
                    default:
                        Console.WriteLine(constants.option_was_not_recognised);
                        display_user_menu_flag = true;
                        break;
                }

                Console.Write("Select: ");
                var user_room_select = Console.ReadLine();
                Console.WriteLine(Add_cleaners.Get_cleaner(Convert.ToString(user_number)) + " is exempt from " + Build_location.Get_room(user_room_select));//carry on  from here 03/06/2018

            } while (display_user_menu_flag);
        }

        private static void Display_room_list_menu()
        {
            Build_location.Get_room_list();
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

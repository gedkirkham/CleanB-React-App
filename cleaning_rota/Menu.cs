using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    static public class Menu
    {
        static public void Main_menu()
        {
            bool display_main_menu_flag;

            do
            {
                display_main_menu_flag = false;

                Console.WriteLine();
                Console.WriteLine(
                "1. Cleaners\n" +
                "2. Rooms\n" +
                "3. Calendar\n" +                
                "4. Logout"
                );

                Console.Write("Select: ");
                string menu_user_input = Console.ReadLine() ?? String.Empty;

                switch (menu_user_input.ToLower())
                {
                    case "1":
                    case "cleaners":
                        Cleaner_menu();
                        break;
                    case "2":
                    case "rooms":
                        Room_menu();
                        break;
                    case "3":
                    case "calendar":
                        Calendar.View_calendar();
                        break;
                    case "4":
                    case "logout":
                        Program.Logout();
                        break;
                    default:
                        Console.WriteLine(Constants.option_was_not_recognised);
                        display_main_menu_flag = true;
                        break;
                }

            } while (display_main_menu_flag);
        }

        static public void Cleaner_menu()
        {
            var menu_user_input = String.Empty;

            Console.WriteLine();
            Cleaner.Get_cleaner_list();
            int cleaner_list_count = Cleaner.Get_cleaner_list_count();

            Console.WriteLine(++cleaner_list_count + Constants.add_cleaner);
            Console.WriteLine(++cleaner_list_count + Constants.main_menu);

            bool flag;
            int menu_selection;
            do
            {
                do
                {
                    Console.Write(Constants.select);
                    menu_user_input = Console.ReadLine() ?? String.Empty;
                    (flag, menu_selection) = User_input_verification.Number_validation(menu_user_input);
                } while (flag);
            } while (User_input_verification.Number_range(menu_selection, cleaner_list_count+2));

            cleaner_list_count = Cleaner.Get_cleaner_list_count();
            switch (menu_selection)
            {
                case var n when menu_selection > 0 && menu_selection <= cleaner_list_count:
                    Display_user_menu(Cleaner.Get_cleaner(menu_selection));
                    break;
                case var n when menu_selection == ++cleaner_list_count:
                    Cleaner.Add_cleaner();
                    break;
                case var n when menu_selection == ++cleaner_list_count:
                    Main_menu();
                    break;
                default:
                    break;
            }
        }

        private static void Display_user_menu(string _cleaners_name)
        {
            bool display_user_menu_flag = true;
            do
            {
                Console.WriteLine();
                Console.Write(
                    _cleaners_name + @":
                    1. Exempt from room
                    2. Amend name
                    3. Delete user
                    4. Main menu
                    {0}", Constants.select
                );

                var menu_user_input = Console.ReadLine() ?? String.Empty;
                switch (menu_user_input)
                {
                    case "1":
                        bool exempt_user_flag = false;
                        do
                        {
                            Room_menu();
                            Console.Write(Constants.select);
                            var user_room_select = Console.ReadLine();
                            (string room_name, string room_frequency) = House.Get_room(user_room_select);
                            Console.WriteLine(_cleaners_name + " is exempt from " + room_name);

                            var exempt_user_input = String.Empty;
                            bool exempt_user_input_flag = false;

                            do
                            {
                                Console.Write("Any more?" + "(" + Constants.YN + "): ");
                                exempt_user_input = Console.ReadLine();

                                switch (exempt_user_input.ToUpper())
                                {
                                    case "Y":
                                        exempt_user_input_flag = false;
                                        exempt_user_flag = true;
                                        break;
                                    case "N":
                                        exempt_user_input_flag = false;
                                        exempt_user_flag = false;
                                        break;
                                    default:
                                        exempt_user_input_flag = true;
                                        Console.WriteLine(Constants.option_was_not_recognised);
                                        break;
                                }
                            } while (exempt_user_input_flag);
                        } while (exempt_user_flag);

                        display_user_menu_flag = true;
                        break;

                    case "4":
                        Menu.Main_menu();
                        break;
                    default:
                        Console.WriteLine(Constants.option_was_not_recognised);
                        display_user_menu_flag = true;
                        break;
                }

            } while (display_user_menu_flag);
        }

        public static void Room_menu()
        {
            Console.WriteLine();
            House.Get_room_list();
        }

        static public string Nothing_returned_add_something(string _menu_case)
        {
            bool add_flag;
            string add_user_flag;
            do
            {
                add_flag = false;
                Console.Write("You do not have any {0}. Would you like to add some? {1}", _menu_case, Constants.YN_brackets);
                add_user_flag = Console.ReadLine() ?? string.Empty;
                add_flag = User_input_verification.YN(add_user_flag);
            } while (add_flag);

            return add_user_flag;
        }

        static public bool Add_another(bool _add_flag)
        {
            bool add_flag_valid;
            do
            {
                add_flag_valid = false;

                Console.WriteLine();
                Console.Write("Add another? (" + Constants.YN + "): ");
                var add_flag_user = Console.ReadLine() ?? String.Empty;

                switch (add_flag_user.ToUpper())
                {
                    case "Y":
                        _add_flag = true;
                        break;
                    case "N":
                        _add_flag = false;
                        break;
                    default:
                        Console.WriteLine(Constants.option_was_not_recognised);
                        add_flag_valid = true;
                        break;
                }
            } while (add_flag_valid);

            return _add_flag;
        }
    }
}

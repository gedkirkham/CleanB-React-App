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
                        Menu.Cleaner_menu();
                        break;
                    case "2":
                    case "rooms":
                        Menu.Room_menu();
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
            bool display_user_list_menu_flag;
            var menu_user_input = String.Empty;

            do
            {
                display_user_list_menu_flag = true;

                if (!Add_cleaners.Get_cleaner_list())
                {
                    Console.WriteLine("");//carry on from here - trigger ability to add cleaner.
                }

                Console.Write("Select: ");
                menu_user_input = Console.ReadLine() ?? String.Empty;
                int menu_user_input_converted = Convert.ToInt16(menu_user_input);

                switch (menu_user_input_converted)//add error handling
                {
                    case var n when menu_user_input_converted > 0 && menu_user_input_converted < Add_cleaners.Get_user_list_length():
                        display_user_list_menu_flag = false;
                        Display_user_menu(n);
                        break;
                    default:
                        Console.WriteLine(Constants.option_was_not_recognised);
                        display_user_list_menu_flag = true;
                        break;
                }

            } while (display_user_list_menu_flag);
        }

        private static void Display_user_menu(int user_number)
        {
            bool display_user_menu_flag = true;
            do
            {
                Console.Write(
                    "1. Exempt from room\n" +
                    "2. Amend name\n" +
                    "3. Delete user\n" +
                    "4. Main menu\n" +
                    "Select: "
                );

                var menu_user_input = Console.ReadLine() ?? String.Empty;
                switch (menu_user_input)
                {
                    case "1":
                        bool exempt_user_flag = false;
                        do
                        {
                            Menu.Room_menu();
                            Console.Write("Select: ");
                            var user_room_select = Console.ReadLine();
                            (string room_name, string room_frequency) = Build_location.Get_room(user_room_select);
                            Console.WriteLine(Add_cleaners.Get_cleaner(Convert.ToString(user_number)) + " is exempt from " + room_name);

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
            Build_location.Get_room_list();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cleaning_rota
{
    static public class Calendar
    {
        static public void Cleaner_and_rooms_list_count()
        {
            Console.WriteLine();
            Console.WriteLine(Constants.cleaners_and_rooms_required);
            Cleaner.Cleaner_nothing_returned();
            House.House_nothing_returned();
        }

        static public string Cleaner_list_count()
        {
            Console.WriteLine();
            Console.WriteLine(Constants.cleaners_required);
            string _user_input = Cleaner.Cleaner_nothing_returned();

            return _user_input;
        }

        static public string Room_list_count()
        {
            Console.WriteLine();
            Console.WriteLine(Constants.rooms_required);
            string _user_input = House.House_nothing_returned();

            return _user_input;
        }

        static public void Calendar_check()
        {
            if (Cleaner.Get_cleaner_list_count() == 0 && House.Get_room_list_count() == 0)
            {
                Cleaner_and_rooms_list_count();

                if (Cleaner.Get_cleaner_list_count() == 0 || House.Get_room_list_count() == 0)
                {
                    Console.WriteLine();
                    Console.WriteLine(Constants.cleaners_and_rooms_required);
                    Console.ReadLine();
                    Menu.Main_menu();
                }
            }
            else if (Cleaner.Get_cleaner_list_count() == 0 && House.Get_room_list_count() > 0)
            {
                string _user_input = Cleaner_list_count();

                if (_user_input.Equals("N", StringComparison.OrdinalIgnoreCase)) {
                    Menu.Main_menu();
                }
            }
            else if (Cleaner.Get_cleaner_list_count() > 0 && House.Get_room_list_count() == 0)
            {
                string _user_input = Room_list_count();

                if (_user_input.Equals("N", StringComparison.OrdinalIgnoreCase))
                {
                    Menu.Main_menu();
                }
            }

            if (Cleaner.Get_cleaner_list_count() > 0 && House.Get_room_list_count() > 0)
            {
                Display_calendar();
            }
            else
            {
                Menu.Main_menu();
            }
                
        }

        static public void Display_calendar()
        {
            Console.WriteLine("Display calendar...");
        }
    }
}
